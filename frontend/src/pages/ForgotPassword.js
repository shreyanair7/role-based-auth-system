import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const forgotPassword = async () => {

    try {

      const res = await axios.post(
        'http://127.0.0.1:5000/forgot-password',
        { email }
      );

      setToken(res.data.token);

      setMessage(
        'Password reset link sent to your email.'
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

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <button
          style={styles.primaryButton}
          onClick={forgotPassword}
        >
          Generate Reset Token
        </button>

        {

          token && (

            <div style={styles.tokenBox}>

              <strong>
                Reset Token:
              </strong>

              <p>
                {token}
              </p>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  navigate('/reset-password', {
                    state: { token }
                  })
                }
              >
                Continue Reset
              </button>

            </div>

          )

        }

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
    marginBottom: '10px'
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
    boxSizing: 'border-box'
  },

  primaryButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#111827',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer'
  },

  secondaryButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: '#374151',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '14px'
  },

  messageBox: {
    background: '#f3f4f6',
    padding: '14px',
    borderRadius: '12px',
    marginBottom: '18px'
  },

  tokenBox: {
    marginTop: '24px',
    padding: '16px',
    borderRadius: '12px',
    background: '#f9fafb',
    wordBreak: 'break-word'
  }

};

export default ForgotPassword;