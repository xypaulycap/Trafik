
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-white dark:bg-gray-800 mb-8 shadow-md rounded-2xl">
      {/* Gold accent line at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"  />
      
      {/* Fade effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-transparent to-white dark:to-gray-800 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        <div className="flex justify-between h-28">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ml-2 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/menu/vip"
              className={`px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/menu/vip')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
            >
              VIP Menu
            </Link>

            <Link
              to="/menu/regular"
              className={`px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/menu/regular')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
            >
              Regular Menu
            </Link>
            
            <Link
              to="/about"
              className={`px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className={`px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
            >
              Contact
            </Link>

            <div className="ml-6">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-6`}>
          <div className="px-2 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/menu/vip"
              className={`block px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/menu/vip')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              VIP Menu
            </Link>

            <Link
              to="/menu/regular"
              className={`block px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/menu/regular')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Regular Menu
            </Link>
            
            <Link
              to="/about"
              className={`block px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/about')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className={`block px-4 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'bg-gradient-to-r from-amber-300 to-orange-400 text-gray-800 dark:text-gray-900 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="px-2 py-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Menu, X, Sun, Moon, Home, Utensils, Star, Info, Phone } from 'lucide-react';

// const Navbar = () => {
//   const [currentPath, setCurrentPath] = useState('/');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   const navigation = [
//     { name: 'Home', href: '/', icon: Home },
//     { name: 'VIP Menu', href: '/menu/vip', icon: Star },
//     { name: 'Regular Menu', href: '/menu/regular', icon: Utensils },
//     { name: 'About', href: '/about', icon: Info },
//     { name: 'Contact', href: '/contact', icon: Phone },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const isActive = (path) => {
//     return currentPath === path;
//   };

//   const handleNavClick = (path) => {
//     setCurrentPath(path);
//     setIsMenuOpen(false);
//   };

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       {/* Backdrop for mobile menu */}
//       {isMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled 
//           ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl' 
//           : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
//       }`}>
//         {/* Premium gradient accent */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo Section */}
//             <div className="flex items-center">
//               <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('/')}>
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
//                       <span className="text-white font-bold text-xl">TL</span>
//                     </div>
//                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse" />
//                   </div>
//                   <div className="hidden sm:block">
//                     <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
//                       Trafik Lounge
//                     </h1>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
//                       Premium Experience
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:block">
//               <div className="flex items-center space-x-2">
//                 {navigation.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <button
//                       key={item.name}
//                       onClick={() => handleNavClick(item.href)}
//                       className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
//                         isActive(item.href)
//                           ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
//                           : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 hover:text-amber-700 dark:hover:text-amber-400'
//                       }`}
//                     >
//                       <Icon className="w-4 h-4" />
//                       <span>{item.name}</span>
//                       {isActive(item.href) && (
//                         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-50" />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Right side actions */}
//             <div className="flex items-center space-x-4">
//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleTheme}
//                 className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30 transition-all duration-300 hover:scale-110 group"
//               >
//                 {isDark ? (
//                   <Sun className="w-5 h-5 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-gray-600 group-hover:-rotate-12 transition-transform duration-300" />
//                 )}
//               </button>

//               {/* Mobile menu button */}
//               <button
//                 onClick={toggleMenu}
//                 className="md:hidden p-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-110"
//               >
//                 {isMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-in-out ${
//           isMenuOpen 
//             ? 'opacity-100 translate-y-0 pointer-events-auto' 
//             : 'opacity-0 -translate-y-4 pointer-events-none'
//         }`}>
//           <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
//             <div className="px-4 py-6 space-y-2">
//               {navigation.map((item, index) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavClick(item.href)}
//                     className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
//                       isActive(item.href)
//                         ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-[0.98]'
//                         : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 hover:text-amber-700 dark:hover:text-amber-400 hover:scale-[0.98]'
//                     }`}
//                     style={{ 
//                       animationDelay: `${index * 100}ms`,
//                       animation: isMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
//                     }}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span className="text-lg">{item.name}</span>
//                     {isActive(item.href) && (
//                       <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
//                     )}
//                   </button>
//                 );
//               })}
              
//               {/* Mobile CTA */}
//               <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
//                 <button className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-[0.98] shadow-lg">
//                   Make Reservation
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Spacer to prevent content from hiding behind fixed navbar */}
//       <div className="h-20" />

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;