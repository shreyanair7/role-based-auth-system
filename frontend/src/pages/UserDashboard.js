import React from 'react';

import { useNavigate } from 'react-router-dom';

function UserDashboard() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem('username');

  // LOGOUT

  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('username');

    localStorage.removeItem('role');

    navigate('/');

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.topBar}>

          <h1 style={styles.title}>
            User Dashboard
          </h1>

          <button
            style={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <p style={styles.message}>

          Welcome! You have successfully logged
          in to your user dashboard.
          Explore your features and manage
          your account.

        </p>

        <div style={styles.userCard}>

          Logged in as:
          <strong> {username}</strong>

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: '100vh',
    background: '#f5f7fb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter, sans-serif'
  },

  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },

  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },

  title: {
    fontSize: '32px',
    color: '#111827',
    margin: 0
  },

  logoutButton: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '10px',
    background: '#111827',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600'
  },

  message: {
    color: '#4b5563',
    lineHeight: '1.8',
    fontSize: '16px'
  },

  userCard: {
    marginTop: '30px',
    padding: '18px',
    borderRadius: '12px',
    background: '#f3f4f6'
  }

};

export default UserDashboard;