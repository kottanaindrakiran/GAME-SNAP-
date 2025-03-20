import React from 'react';

const games = [
  {
    id: 1,
    title: "Adventure Game 1",
    imageUrl: "https://your-image-link.com/adventure-game-1.jpg",
    playUrl: "https://your-game-link.com/adventure-game-1",
  },
  {
    id: 2,
    title: "Adventure Game 2",
    imageUrl: "https://your-image-link.com/adventure-game-2.jpg",
    playUrl: "https://your-game-link.com/adventure-game-2",
  },
  // Add more games
];

const AdventureGamesDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Adventure Games Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.id} className="border rounded-lg p-4">
            <img src={game.imageUrl} alt={game.title} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{game.title}</h2>
            <a href={game.playUrl} target="_blank" rel="noopener noreferrer">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                Play Now
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureGamesDashboard;
