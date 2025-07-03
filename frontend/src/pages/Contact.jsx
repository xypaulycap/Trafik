
import React, { useState } from 'react';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-slate-900 bg-[url('/pattern.svg')] bg-fixed bg-cover relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get in touch with Trafik Lounge for any inquiries or feedback
          </p>
        </div>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-96 relative mb-12 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          <img
            src="/images/contact.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Let's Connect
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-600 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-white/5 border border-gray-400 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                  placeholder='your name'
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 dark:bg-white/5 border border-gray-400 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                  placeholder=' your email'
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-white/10 dark:bg-white/5 border border-gray-400 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  required
                  placeholder='enter your message'
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-400/50 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Find Us
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.661911340416!2d5.609069!3d6.308071699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d3007caed0bd%3A0x9a5f31a9c113dde2!2sTrafik%20Lounge!5e0!3m2!1sen!2sng!4v1745563969922!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-amber-400 text-xl" />
                <a
                  href="tel:+2348141389693"
                  className="text-gray-600 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-400 transition-colors duration-300 underline"
                >
                  +234 814 138 9693
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FaWhatsapp className="text-amber-400 text-xl" />
                <a
                  href="https://wa.link/xs3i0w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-400 transition-colors duration-300 underline"
                >
                  WhatsApp: +234 814 138 9693
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-amber-400 text-xl" />
                <p className="text-gray-600 dark:text-gray-300">
                  No. 4a Ewere Street, off Akhionbare street, G.R.A. Benin City, Edo State.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Follow Us
            </h2>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-orange-500 transition-colors duration-300"
              >
                <FaInstagram className="w-8 h-8" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-orange-500 transition-colors duration-300"
              >
                <FaFacebook className="w-8 h-8" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-orange-500 transition-colors duration-300"
              >
                <FaTiktok className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;