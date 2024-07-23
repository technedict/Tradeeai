from datetime import datetime, timezone
from flask import render_template, flash, redirect, url_for, request, g, \
    current_app
from flask_login import current_user, login_required
from flask_babel import _, get_locale
import sqlalchemy as sa
from langdetect import detect, LangDetectException
from app import db
from app.admin.forms import BalanceForm
from app.models import User, Payment
from app.translate import translate
from app.admin import bp


@bp.route('/', methods=['GET', 'POST'])
@login_required
def index():
    if current_user.is_admin == False:
        if current_user.email in current_app.config['ADMINS']:
            current_user.is_admin = True
            db.session.commit()
            flash(f'{current_user} is now an Admin!.',category="info")
        else:
            flash('You do not have sufficient requirements to become an admin')
            return redirect(url_for('main.index'))
    users = User.query.all() 
    return render_template('admin/index.html', users=users)

@bp.route('/topup/<id>', methods=['GET', 'POST'])
@login_required
def topup(id):
    if current_user.is_admin is False:
        return redirect(url_for('main.index'))
    form=BalanceForm()
    user = db.session.scalar(
            sa.select(User).where(User.id == id))
    if form.validate_on_submit():
        user.balance = form.balance.data
        db.session.commit()
    return render_template('admin/topup.html', form=form, user=user)

@bp.route('/clear/<id>', methods=['GET', 'POST'])
@login_required
def clear(id):
    if current_user.is_admin is False:
        return redirect(url_for('main.index'))
    payment = db.session.scalar(
            sa.select(Payment).where(Payment.id == id))
    db.session.delete(payment)
    db.session.commit()
    return redirect(url_for('admin.approval'))

@bp.route('/payments', methods=['GET', 'POST'])
@login_required
def approval():
    if current_user.is_admin is False:
        return redirect(url_for('main.index'))
    payments = Payment.query.all()
    return render_template('admin/pending.html', payments = payments)
