import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCard } from '../components/CategoryCard';
import { categories } from '../data/categories';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to GameSnap
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Choose your gaming adventure from our exciting categories
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
};
