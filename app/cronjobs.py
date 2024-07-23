from flask_login import current_user
from app import crontab
from app import db
from app.models import Trade
import sqlalchemy as sa 
import ast


@crontab.job(minute="1", hour="0")
def the_trade():
    trade = db.session.scalar(
            sa.select(Trade).where(Trade.user_id == current_user.id))
    
    if trade is not None:
        target_length = 18
        value = [1]

    if len(trade.dailychart) > target_length:
        trade.dailychart = trade.set_chart_values(value)
    else:
        old_values = ast.literal_eval(trade.dailychart)
        trade.dailychart = trade.set_chart_values(old_values + value)
    db.session.commit()