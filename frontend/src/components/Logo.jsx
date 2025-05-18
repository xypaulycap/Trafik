// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/trafiklogo.png';

// const Logo = () => {
//   return (
//     <Link to="/" className="flex items-center group">
//       <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl transform transition-transform duration-300 group-hover:scale-105">
//         <img
//           src={logo}
//           alt="Trafik Logo"
//           className="w-full h-full object-contain p-2"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent dark:from-primary-dark/5 rounded-xl transition-opacity duration-300 group-hover:opacity-0" />
//       </div>
//       <div className="ml-4">
//         <span className="block text-3xl md:text-4xl font-playfair font-semibold text-primary-light dark:text-primary-dark tracking-wider">
//           Trafik
//         </span>
//         <span className="block text-xs md:text-sm font-montserrat font-medium text-secondary-dark dark:text-secondary-light tracking-[0.2em] uppercase mt-1">
//           Lounge
//         </span>
//       </div>
//     </Link>
//   );
// };

// export default Logo; 


import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/trafiklogo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl transform transition-transform duration-300 group-hover:scale-105 shadow-md">
        <img
          src={logo}
          alt="Trafik Logo"
          className="w-full h-full object-contain p-2"
        />
        {/* Gold shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-transparent dark:from-yellow-400/20 rounded-xl transition-opacity duration-300 group-hover:opacity-70" />
      </div>
      <div className="ml-4">
        <span className="block text-3xl md:text-4xl font-bold text-gray-800 dark:text-white tracking-wider transition-colors">
          Trafik
          {/* Gold underline accent */}
          <span className="block h-1 w-2/3 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mt-1 transform origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </span>
        <span className="block text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 tracking-[0.2em] uppercase mt-1 transition-colors">
          Lounge
        </span>
      </div>
    </Link>
  );
};

export default Logo;
