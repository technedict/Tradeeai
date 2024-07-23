from flask_wtf import FlaskForm
from flask_babel import _, lazy_gettext as _l
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import ValidationError, DataRequired, Email, EqualTo
import sqlalchemy as sa
from app import db
from app.models import User


class LoginForm(FlaskForm):
    email = StringField(_l('Email'), validators=[DataRequired(), Email()], render_kw={"placeholder": "email@example.com", "id": "login-form-email"})
    password = PasswordField(_l('Password'), validators=[DataRequired()], render_kw={"placeholder": "Password", "id": "login-form-password"})
    remember_me = BooleanField(_l('Remember Me'))
    submit = SubmitField(_l('Sign In'))


class RegistrationForm(FlaskForm):
    firstname = StringField(_l('First Name'), validators=[DataRequired()], render_kw={"placeholder": "John", "id": "signup-form-fname"})
    lastname = StringField(_l('Last Name'), validators=[DataRequired()], render_kw={"placeholder": "Doe", "id": "signup-form-lname"})
    email = StringField(_l('Email'), validators=[DataRequired(), Email()], render_kw={"placeholder": "email@example.com", "id": "signup-form-email"})
    password = PasswordField(_l('Password'), validators=[DataRequired()], render_kw={"placeholder": "Password", "id": "signup-form-password"})
    password2 = PasswordField(
        _l('Repeat Password'), validators=[DataRequired(),
                                           EqualTo('password')], render_kw={"placeholder": "Repeat Password", "id": "signup-form-confirm_password"})
    TC = BooleanField(_l('Remember Me'), validators=[DataRequired()], render_kw={"id": "signup-form-accept_terms"})
    submit = SubmitField(_l('Register'))

    def validate_email(self, email):
        user = db.session.scalar(sa.select(User).where(
            User.email == email.data))
        if user is not None:
            raise ValidationError(_('Please use a different email address.'))


class ResetPasswordRequestForm(FlaskForm):
    email = StringField(_l('Email'), validators=[DataRequired(), Email()])
    submit = SubmitField(_l('Request Password Reset'))


class ResetPasswordForm(FlaskForm):
    password = PasswordField(_l('Password'), validators=[DataRequired()])
    password2 = PasswordField(
        _l('Repeat Password'), validators=[DataRequired(),
                                           EqualTo('password')])
    submit = SubmitField(_l('Request Password Reset'))
