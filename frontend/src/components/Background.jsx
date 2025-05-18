// import React from 'react';

// const Background = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       {/* Animated gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-radial from-primary-light/10 to-transparent dark:from-primary-dark/10 dark:to-transparent animate-pulse" />
      
//       {/* Content container */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Background; 


import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Gold accent elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-70 dark:opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 opacity-70 dark:opacity-50" />
      
      {/* Subtle animated patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      
      {/* Gold dust particles effect (subtle) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNGNUNGNjYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-30 dark:opacity-10" />
      
      {/* Content container with extra padding for the design elements */}
      <div className="relative z-10 px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default Background;
