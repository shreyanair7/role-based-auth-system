// frontend/src/pages/ForgotPassword.js

import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const navigate = useNavigate();

  // STATES

  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  // FORGOT PASSWORD FUNCTION

  const forgotPassword = async () => {

    setLoading(true);

    setMessage('');

    try {

      const res = await axios.post(

        'http://127.0.0.1:5000/forgot-password',

        { email }

      );

      setMessage(
        res.data.message
      );

    } catch (err) {

      if(err.response){

        setMessage(
          err.response.data.message
        );

      } else {

        setMessage(
          'Backend server not responding.'
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Forgot Password
        </h1>

        <p style={styles.subtitle}>
          Enter your registered email
        </p>

        {

          message && (

            <div style={styles.messageBox}>

              {message}

            </div>

          )

        }

        {/* EMAIL INPUT */}

        <input

          style={styles.input}

          type="email"

          placeholder="Email Address"

          onChange={(e)=>
            setEmail(e.target.value)
          }

        />

        {/* BUTTON */}

        <button

          style={{
            ...styles.primaryButton,

            background: loading
              ? '#374151'
              : '#111827',

            opacity: loading
              ? 0.8
              : 1,

            transform: loading
              ? 'scale(0.98)'
              : 'scale(1)',

            transition: 'all 0.2s ease'
          }}

          onClick={forgotPassword}

          disabled={loading}

        >

          {

            loading
            ? 'Sending Reset Email...'
            : 'Send Reset Link'

          }

        </button>

        {/* BACK TO LOGIN */}

        <p

          style={styles.backText}

          onClick={() => navigate('/')}

        >

          Back to Login

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

    marginBottom: '10px',

    color: '#111827'

  },

  subtitle: {

    color: '#6b7280',

    marginBottom: '24px'

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

  messageBox: {

    background: '#f3f4f6',

    padding: '14px',

    borderRadius: '12px',

    marginBottom: '18px',

    color: '#111827',

    fontSize: '14px'

  },

  backText: {

    marginTop: '20px',

    textAlign: 'center',

    color: '#6b7280',

    cursor: 'pointer',

    fontSize: '14px'

  }

};

export default ForgotPassword;