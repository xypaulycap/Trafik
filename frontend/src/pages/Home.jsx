import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/hero1.jpeg',
      title: 'Welcome to Trafik Lounge',
      subtitle: 'Experience the perfect blend of comfort and style'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Culinary Excellence',
      subtitle: 'Savor our carefully crafted menu'
    },
    {
      image: '/images/hero3.jpg',
      title: 'Unforgettable Moments',
      subtitle: 'Create memories in our elegant space'
    },
    {
      image: '/images/hero4.jpg',
      title: 'Premium Experience',
      subtitle: 'Indulge in luxury and sophistication'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl  font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="px-10 py-4 bg-primary-light dark:bg-primary-dark text-white font-medium hover:bg-opacity-90 hover:scale-105 transition-transform duration-300 ease-in-out transform-gpu shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)]"
                >
                  Order Now
                </Link>
                <Link
                  to="/menu"
                  className="px-10 py-4 bg-transparent border-2 border-white text-white font-medium hover:bg-white hover:text-primary-light dark:hover:text-primary-dark hover:scale-105 transition-transform duration-300 ease-in-out transform-gpu shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)]"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-accent-dark rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-light dark:text-primary-dark mb-6">
              About Trafik Lounge
            </h2>
            <p className="text-lg font-montserrat text-secondary-dark dark:text-secondary-light leading-relaxed">
              Welcome to Trafik Lounge, where elegance meets comfort. Our lounge is designed to provide you with an unforgettable experience, combining sophisticated ambiance with exceptional service. Whether you're looking for a place to unwind after work, celebrate a special occasion, or simply enjoy quality time with friends, Trafik Lounge offers the perfect setting.
            </p>
            <p className="text-lg font-montserrat text-secondary-dark dark:text-secondary-light leading-relaxed mt-4">
              Our carefully curated menu features a selection of premium beverages and delectable dishes, all prepared with the finest ingredients. Every visit to Trafik Lounge is an opportunity to create lasting memories in an atmosphere of refined luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-accent-light dark:bg-accent-dark py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light dark:text-primary-dark hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-300"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light dark:text-primary-dark hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light dark:text-primary-dark hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-300"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light dark:text-primary-dark hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-300"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm font-montserrat text-secondary-dark dark:text-secondary-light">
              © {new Date().getFullYear()} Trafik Lounge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;