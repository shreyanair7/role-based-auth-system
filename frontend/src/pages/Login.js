// frontend/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function Login() {

  const navigate = useNavigate();

  const [username, setLoginUsername] = useState('');
  const [password, setLoginPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const login = async () => {

    try {

      const res = await axios.post(
        'http://127.0.0.1:5000/login',
        {
          username,
          password
        }
      );

      // SAVE DATA

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'username',
        res.data.username
      );

      localStorage.setItem(
        'role',
        res.data.role
      );

      setMessage(res.data.message);

      // ROLE REDIRECTION

      setTimeout(() => {

        if(res.data.role === "Admin"){

          navigate('/admin-dashboard');

        }
        else{

          navigate('/user-dashboard');

        }

      }, 1200);

    } catch (err) {

      if (err.response) {

        setMessage(
          err.response.data.message
        );

      } else {

        setMessage(
          "Backend server not responding."
        );

      }

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Welcome Back
        </h1>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        {

          message && (

            <div style={styles.messageBox}>

              {message}

            </div>

          )

        }

        {/* USERNAME */}

        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e)=>
            setLoginUsername(e.target.value)
          }
        />

        {/* PASSWORD */}

        <div style={styles.passwordContainer}>

          <input
            style={styles.passwordInput}
            type={
              showPassword
              ? "text"
              : "password"
            }
            placeholder="Password"
            onChange={(e)=>
              setLoginPassword(e.target.value)
            }
          />

          <button
            style={styles.eyeButton}
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {
              showPassword
              ? <EyeOff size={20} />
              : <Eye size={20} />
            }

          </button>

        </div>

        {/* LOGIN BUTTON */}

        <button
          style={styles.primaryButton}
          onClick={login}
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}

        <p
          style={styles.forgotPassword}
          onClick={() =>
            navigate('/forgot-password')
          }
        >

          Forgot Password?

        </p>

        {/* REGISTER LINK */}

        <p style={styles.switchText}>

          Don’t have an account?

          <span
            style={styles.switchLink}
            onClick={() =>
              navigate('/register')
            }
          >

            Register

          </span>

        </p>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f7fb',
    fontFamily: 'Inter, sans-serif'
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '40px',
    borderRadius: '18px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },

  title: {
    fontSize: '30px',
    marginBottom: '8px',
    color: '#111827'
  },

  subtitle: {
    color: '#6b7280',
    marginBottom: '28px'
  },

  messageBox: {
    background: '#f3f4f6',
    padding: '14px',
    borderRadius: '12px',
    marginBottom: '18px',
    color: '#111827',
    fontSize: '14px'
  },

  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    marginBottom: '18px',
    boxSizing: 'border-box',
    outline: 'none'
  },

  passwordContainer: {
    position: 'relative',
    marginBottom: '18px'
  },

  passwordInput: {
    width: '100%',
    padding: '14px',
    paddingRight: '50px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    boxSizing: 'border-box',
    outline: 'none'
  },

  eyeButton: {
    position: 'absolute',
    top: '50%',
    right: '14px',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#6b7280'
  },

  primaryButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#111827',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '15px'
  },

  forgotPassword: {
    textAlign: 'right',
    marginTop: '14px',
    cursor: 'pointer',
    color: '#374151',
    fontSize: '14px'
  },

  switchText: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px'
  },

  switchLink: {
    marginLeft: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    color: '#111827'
  }

};

export default Login;