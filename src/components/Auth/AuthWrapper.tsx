import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '../../contexts/AuthContext';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {showSignUp ? (
            <SignUp onSignIn={() => setShowSignUp(false)} />
          ) : (
            <SignIn onSignUp={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;