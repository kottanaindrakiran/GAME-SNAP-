import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface LeaderboardEntry {
  id: string;
  score: number;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}

interface LeaderboardProps {
  gameId: string;
  timePeriod: 'daily' | 'weekly' | 'all_time';
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameId, timePeriod }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let query = supabase
          .from('leaderboard_entries')
          .select(`
            id,
            score,
            created_at,
            profiles (
              username,
              avatar_url
            )
          `)
          .eq('game_id', gameId)
          .eq('time_period', timePeriod)
          .order('score', { ascending: false })
          .limit(10);

        const { data, error } = await query;

        if (error) throw error;
        setEntries(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [gameId, timePeriod]);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold">{index + 1}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Leaderboard
      </h2>
      
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center space-x-4 p-4 rounded-lg ${
              user?.id === entry.id
                ? 'bg-indigo-50 dark:bg-indigo-900/20'
                : 'bg-gray-50 dark:bg-gray-700/50'
            }`}
          >
            <div className="flex-shrink-0">{getRankIcon(index)}</div>
            
            <div className="flex-shrink-0">
              <img
                src={entry.profiles.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.profiles.username}`}
                alt={entry.profiles.username}
                className="w-10 h-10 rounded-full"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {entry.profiles.username}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Score: {entry.score.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No entries yet. Be the first to set a high score!
          </div>
        )}
      </div>
    </div>
  );
};