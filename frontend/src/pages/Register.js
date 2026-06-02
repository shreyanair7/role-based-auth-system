import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  // STATES

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [role, setRole] = useState('');
  const [terms, setTerms] = useState(false);

  // PASSWORD VISIBILITY

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
      useState(false);

  // SUCCESS / ERROR MESSAGE

  const [message, setMessage] = useState('');

  // REGISTER FUNCTION

  const register = async () => {

    try {

      const res = await axios.post(
        'http://127.0.0.1:5000/register',
        {
          username,
          email,
          password,
          confirmPassword,
          role,
          terms
        }
      );

      setMessage(
        `${res.data.title} — ${res.data.message}`
      );

      // REDIRECT AFTER 2 SECONDS

      setTimeout(() => {

        navigate('/');

      }, 2000);

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
          Create Account
        </h1>

        <p style={styles.subtitle}>
          Register to get started
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
            setUsername(e.target.value)
          }
        />

        {/* EMAIL */}

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          onChange={(e)=>
            setEmail(e.target.value)
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
              setPassword(e.target.value)
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

        {/* CONFIRM PASSWORD */}

        <div style={styles.passwordContainer}>

          <input
            style={styles.passwordInput}
            type={
              showConfirmPassword
              ? "text"
              : "password"
            }
            placeholder="Confirm Password"
            onChange={(e)=>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            style={styles.eyeButton}
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            {
              showConfirmPassword
              ? <EyeOff size={20} />
              : <Eye size={20} />
            }

          </button>

        </div>

        {/* ROLE */}

        <select
          style={styles.input}
          onChange={(e)=>
            setRole(e.target.value)
          }
        >

          <option value="">
            Select Role
          </option>

          <option value="Admin">
            Admin
          </option>

          <option value="User">
            User
          </option>

        </select>

        {/* TERMS */}

        <label style={styles.checkboxLabel}>

          <input
            type="checkbox"
            onChange={(e)=>
              setTerms(e.target.checked)
            }
          />

          <span style={{marginLeft:"8px"}}>

            I accept Terms & Conditions

          </span>

        </label>

        {/* REGISTER BUTTON */}

        <button
          style={styles.primaryButton}
          onClick={register}
        >
          Register
        </button>

        {/* LOGIN LINK */}

        <p style={styles.switchText}>

          Already have an account?

          <span
            style={styles.switchLink}
            onClick={() => navigate('/')}
          >

            Login

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
    fontFamily: 'Inter, sans-serif',
    padding: '20px'
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#ffffff',
    borderRadius: '18px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },

  title: {
    margin: 0,
    fontSize: '30px',
    fontWeight: '700',
    color: '#111827'
  },

  subtitle: {
    color: '#6b7280',
    marginBottom: '30px',
    marginTop: '8px',
    fontSize: '15px'
  },

  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    outline: 'none',
    marginBottom: '18px',
    fontSize: '15px',
    boxSizing: 'border-box'
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
    outline: 'none',
    fontSize: '15px',
    boxSizing: 'border-box'
  },

  eyeButton: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#6b7280'
  },

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#374151',
    marginBottom: '22px'
  },

  primaryButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#111827',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer'
  },

  switchText: {
    textAlign: 'center',
    marginTop: '22px',
    fontSize: '14px',
    color: '#6b7280'
  },

  switchLink: {
    color: '#111827',
    fontWeight: '600',
    marginLeft: '6px',
    cursor: 'pointer'
  },

  messageBox: {
    background: '#f3f4f6',
    padding: '14px',
    borderRadius: '12px',
    marginBottom: '18px',
    color: '#111827',
    fontSize: '14px'
  }

};

export default Register;