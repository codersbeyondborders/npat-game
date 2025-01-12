import React, { useState } from 'react';
import { signUp, signIn, getCurrentUser } from 'aws-amplify/auth';

const AuthContainer: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    code: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email
          }
        }
      });
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again.');
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({
        username: formData.username,
        confirmationCode: formData.code
      });
      setShowConfirmation(false);
      setIsSignUp(false);
    } catch (error) {
      console.error('Error confirming sign up:', error);
      setError('Failed to confirm sign up. Please try again.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({
        username: formData.username,
        password: formData.password
      });
      // Redirect to game or update auth context
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  if (showConfirmation) {
    return (
      <div className="auth-container">
        <h2>Confirm Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleConfirmSignUp}>
          <div>
            <label>Confirmation Code:</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        {isSignUp && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button
        className="switch-auth-mode"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
};

export default AuthContainer;