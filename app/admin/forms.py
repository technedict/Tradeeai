from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import ValidationError, DataRequired, Length
import sqlalchemy as sa
from flask_babel import _, lazy_gettext as _l
from app import db
from app.models import User

class BalanceForm(FlaskForm):
    balance = IntegerField(_l('Balance'), validators=[
        DataRequired()])
    submit = SubmitField(_l('Update'))
