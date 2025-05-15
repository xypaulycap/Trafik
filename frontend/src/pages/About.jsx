import React, { useState } from 'react';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary-light dark:text-primary-dark text-center mb-12">
          About Us
        </h1>
        
        <div className="bg-white dark:bg-accent-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]">
          {/* Image Section */}
          <div className="w-full h-96 overflow-hidden">
            <img 
              src="/images/about.jpg" 
              alt="Trafik Lounge Interior" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Text Section */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-primary-light dark:text-primary-dark mb-6">
              Our Story
            </h2>
            <p className="text-lg font-montserrat text-secondary-dark dark:text-secondary-light leading-relaxed mb-6">
              Welcome to Trafik Lounge, where elegance meets comfort. Our journey began with a simple vision: to create a space where people can unwind, connect, and create unforgettable memories. Every detail, from our carefully curated menu to our sophisticated ambiance, is designed with your experience in mind.
            </p>
            
            {isExpanded && (
              <div className="space-y-6">
                <p className="text-lg font-montserrat text-secondary-dark dark:text-secondary-light leading-relaxed">
                  Our team of passionate professionals is dedicated to providing exceptional service and creating an atmosphere that feels both luxurious and welcoming. Whether you're joining us for a casual evening or a special celebration, we strive to make every visit memorable.
                </p>
                <p className="text-lg font-montserrat text-secondary-dark dark:text-secondary-light leading-relaxed">
                  At Trafik Lounge, we believe in the power of good company, great food, and unforgettable moments. Join us and become part of our story.
                </p>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-light dark:text-primary-dark font-montserrat font-medium hover:underline transition-all duration-300"
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