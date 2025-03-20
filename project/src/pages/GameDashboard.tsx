import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';
import { Leaderboard } from '../components/Leaderboard';
import { supabase } from '../lib/supabase';

interface GameDashboardProps {
  category: Category;
}

interface Game {
  id: string;
  title: string;
  imageUrl: string;
}

export const GameDashboard: React.FC<GameDashboardProps> = ({ category }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<'daily' | 'weekly' | 'all_time'>('all_time');

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('category', category.id);

      if (error) {
        console.error('Error fetching games:', error);
        return;
      }

      setGames(data || []);
      if (data && data.length > 0) {
        setSelectedGame(data[0].id);
      }
    };

    fetchGames();
  }, [category.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {category.icon} {category.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Choose your favorite {category.name.toLowerCase()} and start playing!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${
                  selectedGame === game.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedGame(game.id)}
              >
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {game.title}
                  </h3>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    Play Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="mb-6">
              <div className="flex rounded-lg overflow-hidden">
                <button
                  onClick={() => setLeaderboardPeriod('daily')}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    leaderboardPeriod === 'daily'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setLeaderboardPeriod('weekly')}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    leaderboardPeriod === 'weekly'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setLeaderboardPeriod('all_time')}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    leaderboardPeriod === 'all_time'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
            
            {selectedGame && (
              <Leaderboard
                gameId={selectedGame}
                timePeriod={leaderboardPeriod}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};