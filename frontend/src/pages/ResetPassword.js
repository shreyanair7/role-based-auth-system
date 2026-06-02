// frontend/src/pages/ResetPassword.js

import React, { useState } from 'react';

import axios from 'axios';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  Eye,
  EyeOff
} from 'lucide-react';

function ResetPassword() {

  const navigate = useNavigate();

  // TOKEN FROM URL

  const { token } = useParams();

  // STATES

  const [newPassword, setNewPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState('');

  // RESET PASSWORD

  const resetPassword = async () => {

    try {

      const res = await axios.post(

        'http://127.0.0.1:5000/reset-password',

        {
          token,
          newPassword
        }

      );

      setMessage(
        res.data.message
      );

      // REDIRECT TO LOGIN

      setTimeout(() => {

        navigate('/');

      }, 2000);

    } catch(err){

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
          Reset Password
        </h1>

        <p style={styles.subtitle}>
          Enter your new password
        </p>

        {

          message && (

            <div style={styles.messageBox}>

              {message}

            </div>

          )

        }

        {/* PASSWORD */}

        <div style={styles.passwordContainer}>

          <input

            style={styles.passwordInput}

            type={
              showPassword
              ? "text"
              : "password"
            }

            placeholder="New Password"

            onChange={(e)=>
              setNewPassword(e.target.value)
            }

          />

          {/* EYE BUTTON */}

          <button

            style={styles.eyeButton}

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

          >

            {

              showPassword
              ? <EyeOff size={20} />
              : <Eye size={20} />

            }

          </button>

        </div>

        {/* RESET BUTTON */}

        <button

          style={styles.primaryButton}

          onClick={resetPassword}

        >

          Reset Password

        </button>

      </div>

    </div>
  );
}

const styles = {

  page: {

    minHeight:'100vh',

    display:'flex',

    justifyContent:'center',

    alignItems:'center',

    background:'#f5f7fb',

    fontFamily:'Inter, sans-serif'

  },

  card: {

    width:'100%',

    maxWidth:'420px',

    background:'#fff',

    padding:'40px',

    borderRadius:'18px',

    boxShadow:'0 10px 30px rgba(0,0,0,0.08)'

  },

  title: {

    fontSize:'30px',

    marginBottom:'8px',

    color:'#111827'

  },

  subtitle: {

    color:'#6b7280',

    marginBottom:'28px'

  },

  messageBox: {

    background:'#f3f4f6',

    padding:'14px',

    borderRadius:'12px',

    marginBottom:'18px',

    color:'#111827',

    fontSize:'14px'

  },

  passwordContainer: {

    position:'relative',

    marginBottom:'18px'

  },

  passwordInput: {

    width:'100%',

    padding:'14px',

    paddingRight:'50px',

    borderRadius:'12px',

    border:'1px solid #d1d5db',

    boxSizing:'border-box',

    outline:'none'

  },

  eyeButton: {

    position:'absolute',

    top:'50%',

    right:'14px',

    transform:'translateY(-50%)',

    border:'none',

    background:'transparent',

    cursor:'pointer',

    color:'#6b7280'

  },

  primaryButton: {

    width:'100%',

    padding:'14px',

    border:'none',

    borderRadius:'12px',

    background:'#111827',

    color:'#fff',

    fontWeight:'600',

    cursor:'pointer',

    fontSize:'15px'

  }

};

export default ResetPassword;