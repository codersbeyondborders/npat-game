import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import GameContainer from './components/GameContainer';
import AuthContainer from './components/AuthContainer';
import './App.css';

const GameWrapper = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return (
    <div>
      <GameContainer />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <GameProvider>
        <main className="app-container">
          <h1>Name, Place, Animal, Thing</h1>
          <GameWrapper />
        </main>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
