// import React, { useEffect, useState } from 'react';

// const ThemeToggle = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     // Check if user has a theme preference
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const savedTheme = localStorage.getItem('theme');
    
//     if (savedTheme) {
//       setIsDark(savedTheme === 'dark');
//       document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//     } else {
//       setIsDark(prefersDark);
//       document.documentElement.classList.toggle('dark', prefersDark);
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//     document.documentElement.classList.toggle('dark');
//     localStorage.setItem('theme', isDark ? 'light' : 'dark');
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-all duration-300"
//       aria-label="Toggle theme"
//     >
//       {isDark ? (
//         <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ) : (
//         <svg className="w-5 h-5 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//         </svg>
//       )}
//     </button>
//   );
// };

// export default ThemeToggle; 

import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;