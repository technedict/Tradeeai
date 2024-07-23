from datetime import datetime, timezone
from hashlib import md5
import json
from time import time
from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask import current_app
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from app import db, login


class User(UserMixin, db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    firstname: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    lastname: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), index=True,
                                             unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    last_seen: so.Mapped[datetime] = so.mapped_column(
        index=True, default=lambda: datetime.now(timezone.utc))
    is_verified: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=1)
    is_admin: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=0)
    oauth: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=0)
    balance: so.Mapped[float] = so.mapped_column(sa.Float(), default=0)
    addy: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, default="")
    bot: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, default="trademaster360")
    sphrase: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, default="")
    trade: so.WriteOnlyMapped['Trade'] = so.relationship(
        back_populates='trader')
    payee: so.WriteOnlyMapped['Payment'] = so.relationship(
        back_populates='payer')

    @property
    def formatted_balance(self):
        self.balance = int(self.balance)
        if len(str(self.balance)) > 3:
            return "${:,}".format(self.balance)
        else:
            return f'${self.balance}'

    def __repr__(self):
        return 'User: {}'.format(self.firstname + " " + self.lastname)
    
    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_password_token(self, expires_in=600):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'], algorithm='HS256')

    def get_verification_token(self, expires_in=600):
        return jwt.encode(
            {'verify': self.email, 'exp': time() + expires_in},
            current_app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except Exception:
            return
        return db.session.get(User, id)

    @staticmethod
    def verify_verification_token(token):
        try:
            email = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['verify']
        except:
            return
        return email


@login.user_loader
def load_user(id):
    return db.session.get(User, int(id))

class Trade(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    dailychart: so.Mapped[str] = so.mapped_column(sa.String(140), nullable=True, default="[0]")
    profitloss: so.Mapped[float] = so.mapped_column(sa.Float(), nullable=True, default=0)
    spot_margin: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=True, default=0)
    dailytv: so.Mapped[str] = so.mapped_column(sa.String(140), nullable=True, default="[[0, 0]]")
    weeklytv: so.Mapped[str] = so.mapped_column(sa.String(140), nullable=True, default="[[0, 0]]")
    monthlytv: so.Mapped[str] = so.mapped_column(sa.String(140), nullable=True, default="[[0, 0]]")
    week: so.Mapped[int] = so.mapped_column(sa.Integer(), default=0)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id),
                                               index=True)

    trader: so.Mapped[User] = so.relationship(back_populates='trade', passive_deletes=True)

    def __repr__(self):
        return 'Trade {}'.format(self.body)
    
    def set_chart_values(self, value):
        return json.dumps(value)
    
    def get_chart_values(self):
        return json.loads(self.dailychart) if self.dailychart else [(0,0)]

    def set_dwm_values(self, value):
        return repr(value)

    def get_daily_values(self):
        return eval(self.dailytv) if self.dailytv else [(0,0)]
    
    def get_weekly_values(self):
        return eval(self.weeklytv) if self.weeklytv else [(0,0)]
    
    def get_monthly_values(self):
        return eval(self.monthlytv) if self.monthlytv else [(0,0)]
    
    def get_profit(self):
        return f"{self.profitloss}%"
    
    def profit_balance(self):
        balance = self.trader.balance
        pb = (float(balance) * (self.profitloss/100))
        pb = round(pb, 2)
        if len(str(pb)) > 3:
            return "${:,}".format(pb)
        else:
            return f'${pb}'
    
    def generate_trade(self):
        import random
        margin = random.randint(30, 50)
        profitmargin = int(margin * 75/100)
        lossmargin = int(margin * 25/100)
        spot_margin = random.randint(1, 10)
        
        values = [(profitmargin, lossmargin, spot_margin)]

        if margin <= 39:
            profit = round(profitmargin * 0.0005 * 100, 1)
        elif margin <= 45:
            profit = round(profitmargin * 0.001 * 100, 1)
        elif margin <= 50:
            profit = round(profitmargin * 0.0016 * 100, 1)

        return profit, values

class Payment(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    dollars: so.Mapped[int] = so.mapped_column(sa.Integer(), nullable=True, default="")
    confirmed: so.Mapped[bool] = so.mapped_column(sa.Boolean(), default=0)
    paymentdate: so.Mapped[datetime] = so.mapped_column(
        index=True, default=lambda: datetime.now(timezone.utc))
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id),
                                               index=True)

    payer: so.Mapped[User] = so.relationship(back_populates='payee', passive_deletes=True)

    def __repr__(self):
        return 'Trade {}'.format(self.body)
    
    