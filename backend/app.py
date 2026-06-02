# backend/app.py
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

import mysql.connector
import re

app = Flask(__name__)
load_dotenv()
CORS(app)

# JWT SECRET
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# MYSQL CONNECTION
db = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)

cursor = db.cursor(dictionary=True)

# ---------------- REGEX ---------------- #

USERNAME_REGEX = r'^[A-Za-z0-9_]{3,50}$'
EMAIL_REGEX = r'^[\w\.-]+@[\w\.-]+\.\w+$'
PASSWORD_REGEX = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$'

# ---------------- REGISTER ---------------- #

@app.route('/register', methods=['POST'])
def register():

    data = request.json

    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    confirm_password = data.get('confirmPassword', '')
    role = data.get('role', '')
    terms = data.get('terms', False)

    # USERNAME VALIDATION
    if not username:
        return jsonify({
            "message": "Username cannot be empty."
        }), 400

    if not re.match(USERNAME_REGEX, username):
        return jsonify({
            "message": "Username must be 3-50 characters and contain only letters, numbers, and underscores."
        }), 400

    # EMAIL VALIDATION
    if not email:
        return jsonify({
            "message": "Email cannot be empty."
        }), 400

    if not re.match(EMAIL_REGEX, email):
        return jsonify({
            "message": "Please enter a valid email address."
        }), 400

    # PASSWORD VALIDATION
    if not password:
        return jsonify({
            "message": "Password cannot be empty."
        }), 400

    if not re.match(PASSWORD_REGEX, password):
        return jsonify({
            "message": "Password must contain uppercase, lowercase, number, special character and be minimum 8 characters."
        }), 400

    # CONFIRM PASSWORD
    if password != confirm_password:
        return jsonify({
            "message": "Passwords do not match. Please re-enter."
        }), 400

    # ROLE VALIDATION
    if role not in ['Admin', 'User']:
        return jsonify({
            "message": "Please select a valid role."
        }), 400

    # TERMS VALIDATION
    if not terms:
        return jsonify({
            "message": "You must accept the Terms & Conditions to register."
        }), 400

    # CHECK USERNAME UNIQUE
    cursor.execute(
        "SELECT * FROM users WHERE username=%s",
        (username,)
    )

    existing_username = cursor.fetchone()

    if existing_username:
        return jsonify({
            "message": "This username is already in use. Please choose another."
        }), 400

    # CHECK EMAIL UNIQUE
    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    existing_email = cursor.fetchone()

    if existing_email:
        return jsonify({
            "message": "This email address is already registered."
        }), 400

    # HASH PASSWORD
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # INSERT USER
    query = """
        INSERT INTO users(username, email, password, role)
        VALUES(%s, %s, %s, %s)
    """

    values = (
        username,
        email,
        hashed_password,
        role
    )

    cursor.execute(query, values)
    db.commit()

    return jsonify({
        "title": "Registration Successful",
        "message": "Your account has been created successfully. Please log in to continue."
    }), 201

# ---------------- LOGIN ---------------- #

@app.route('/login', methods=['POST'])
def login():

    data = request.json

    username = data.get('username', '')
    password = data.get('password', '')

    print(username)

    cursor.execute(
        "SELECT * FROM users WHERE BINARY username=%s",
        (username,)
    )

    user = cursor.fetchone()

    print(user)

    if not user:
        return jsonify({
            "message": "Invalid credentials."
        }), 401

    # CHECK PASSWORD
    if not bcrypt.check_password_hash(user['password'], password):

        return jsonify({
            "message": "Invalid credentials."
        }), 401

    # CREATE JWT TOKEN
    access_token = create_access_token(
        identity=user['username']
    )

    return jsonify({
    "message": f"Login successful. Welcome {user['role']} {user['username']}.",
    "token": access_token,
    "role": user['role'],
    "username": user['username']
}), 200

# ---------------- DASHBOARD ---------------- #

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():

    current_user = get_jwt_identity()

    return jsonify({
        "message": f"Welcome {current_user}"
    })

# ---------------- USERS ---------------- #

@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():

    cursor.execute("""
        SELECT id, username, email, role
        FROM users
    """)

    users = cursor.fetchall()

    return jsonify(users)

# ---------------- RUN ---------------- #

if __name__ == '__main__':
    app.run(debug=True)