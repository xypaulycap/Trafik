import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-light/10 to-transparent dark:from-primary-dark/10 dark:to-transparent animate-pulse" />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background; 