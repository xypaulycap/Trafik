

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Play, MapPin, Clock, Phone } from 'lucide-react';
import { FaUtensils, FaWineGlassAlt, FaStar, FaMusic } from "react-icons/fa";

const slides = [
  {
    image: '/images/slide1.jpg',
    accent: 'Welcome',
    title: 'Trafik Lounge',
    subtitle: 'Experience elegance and comfort in every moment',
  },
  {
    image: '/images/slide2.jpg',
    accent: 'Dine',
    title: 'Culinary Excellence',
    subtitle: 'Savor our curated menu of exquisite dishes',
  },
  {
    image: '/images/slide3.jpg',
    accent: 'Unwind',
    title: 'Sophisticated Ambiance',
    subtitle: 'Relax in a luxurious setting designed for you',
  },
];

const features = [
  {
    icon: <FaUtensils className="text-amber-400" />,
    title: 'Gourmet Dining',
    description: 'Indulge in our carefully curated menu crafted by expert chefs.',
  },
  {
    icon: <FaWineGlassAlt className="text-amber-400" />,
    title: 'Premium Drinks',
    description: 'Enjoy a selection of artisanal cocktails and fine wines.',
  },
  {
    icon: <FaStar className="text-amber-400" />,
    title: 'VIP Experience',
    description: 'Exclusive services for an unforgettable night.',
  },
  {
    icon: <FaMusic className="text-amber-400" />,
    title: 'Live Entertainment',
    description: 'Immerse yourself in live music and vibrant events.',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({
    features: false,
    about: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observers = Object.keys(isVisible).map((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [section]: true }));
          }
        },
        { threshold: 0.2 }
      );
      const element = document.getElementById(section);
      if (element) observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              currentSlide === index
                ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div
                className={`transform transition-all duration-1500 delay-300 ${
                  currentSlide === index
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-300 to-orange-400 text-white font-medium text-sm uppercase tracking-wider rounded-full shadow-lg">
                    {slide.accent}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => navigate('/menu/regular')}
                    className="group relative px-12 py-4 bg-transparent border-2 border-white/80 hover:border-white text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu z-20"
                  >
                    <span className="relative z-10">View Regular Menu</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button
                    onClick={() => navigate('/menu/vip')}
                    className="group relative px-12 py-4 bg-transparent border-2 border-white/80 hover:border-white text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu z-20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      VIP Experience
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === index
                  ? 'w-12 h-3 bg-gradient-to-r from-amber-400 to-orange-500'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/10" />
        <div className="max-w-7xl mx-auto relative">
          <div
            id="features"
            data-animate="true"
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent mb-6">
              Why Choose Trafik Lounge
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what makes us the premier destination for unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20 transform ${
                  isVisible.features
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            id="about"
            data-animate="true"
            className={`bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-12 md:p-16 border border-white/20 transform transition-all duration-1000 ${
              isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent mb-8">
                  About Trafik Lounge
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Welcome to Trafik Lounge, where elegance meets comfort in perfect harmony. Our lounge is meticulously designed to provide you with an unforgettable experience, combining sophisticated ambiance with exceptional service.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="text-amber-400 w-5 h-5" />
                    <span>No. 4a Ewere Street, off Akhionbare street, G.R.A. Benin City, Edo State.</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Clock className="text-amber-400 w-5 h-5" />
                    <span>Open Daily: 2:00 PM - 2:00 AM</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Phone className="text-amber-400 w-5 h-5" />
                    <span>+234 806 9442 681</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-1">
                  <div className="w-full h-full rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-6xl">🏢</span>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-300 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join us at Trafik Lounge and discover why we're the talk of the town. Your table awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.link/xs3i0w">
            <button
              className="px-12 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu"
            >
              Make Reservation
            </button>
            </a>
            <a
              href="/contact"
              className="px-12 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Trafik Lounge</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Where every moment becomes a memory worth cherishing
              </p>
            </div>

            <div className="flex justify-center space-x-8 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-110 transition-all duration-300 hover:shadow-lg"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-110 transition-all duration-300 hover:shadow-lg"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-110 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-6 h-6 text-white font-bold flex items-center justify-center text-sm">T</div>
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-110 transition-all duration-300 hover:shadow-lg"
              >
                <Phone className="w-6 h-6 text-white" />
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Trafik Lounge. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;