import React from 'react';

function UserDashboard() {

  const username =
    localStorage.getItem('username');

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          User Dashboard
        </h1>

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
    maxWidth: '550px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
  },

  title: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#111827'
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