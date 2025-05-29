import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the story behind Trafik Lounge
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
          {/* Image Section */}
          <div className="w-full h-96 overflow-hidden rounded-t-3xl">
            <img
              src="/images/about.jpg"
              alt="Trafik Lounge Interior"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Section */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Welcome to Trafik Lounge, where elegance meets comfort. Our journey began with a simple vision: to create a space where people can unwind, connect, and create unforgettable memories. Every detail, from our carefully curated menu to our sophisticated ambiance, is designed with your experience in mind.
            </p>

            {isExpanded && (
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our team of passionate professionals is dedicated to providing exceptional service and creating an atmosphere that feels both luxurious and welcoming. Whether you're joining us for a casual evening or a special celebration, we strive to make every visit memorable.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  At Trafik Lounge, we believe in the power of good company, great food, and unforgettable moments. Join us and become part of our story.
                </p>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-orange-400/50 transition-all duration-300 transform hover:scale-105"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;