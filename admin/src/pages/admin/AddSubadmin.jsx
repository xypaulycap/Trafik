import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddAdmin = () => {
  const { backendUrl, aToken } = useContext(AdminContext);

  const [role, setRole] = useState('subadmin'); // "subadmin" or "menuadmin"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      role === 'subadmin'
        ? `${backendUrl}/api/admin/add-subadmin`
        : `${backendUrl}/api/admin/add-menuadmin`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          aToken
        }
      });

      if (response.data.success) {
        toast.success(`${role === 'subadmin' ? 'Subadmin' : 'Menuadmin'} added successfully!`);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || `Failed to add ${role}. Please try again.`
      );
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New {role === 'subadmin' ? 'Subadmin' : 'Menuadmin'}
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setRole('subadmin')}
            className={`px-4 py-2 rounded-l-md ${
              role === 'subadmin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Subadmin
          </button>
          <button
            type="button"
            onClick={() => setRole('menuadmin')}
            className={`px-4 py-2 rounded-r-md ${
              role === 'menuadmin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Menuadmin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? `Adding ${role}...` : `Add ${role === 'subadmin' ? 'Subadmin' : 'Menuadmin'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
