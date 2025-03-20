import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TowerControl, Sun, Moon, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

interface NavbarProps {
  theme: 'light' | 'dark' | 'neon';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (query: string) => {
    const categoryMap: { [key: string]: string } = {
      'car games': '/car-games',
      'bike games': '/bike-games',
      'gun games': '/gun-games',
      'mind games': '/mind-games',
      'adventure games': '/adventure-games',
      'fun games': '/fun-games',
      'multiplayer games': '/multiplayer-games',
      'fighting games': '/fighting-games',
      'strategy games': '/strategy-games',
    };

    const path = categoryMap[query.toLowerCase()];
    if (path) {
      navigate(path);
    } else {
      console.log("No matching category found for:", query);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TowerControl className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">GameSnap</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar onSearch={handleSearch} />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
