
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { SubAdminContext } from '../context/SubAdminContext';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'admin' // Default to admin
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAToken, backendUrl, setMaToken, setSaToken,setARole } = useContext(AdminContext);
    const { setSaRole } = useContext(SubAdminContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let response;

            if (formData.userType === 'admin') {
                response = await axios.post(`${backendUrl}/api/admin/login`, {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.success) {
                    const {token, role} = response.data.data
                    localStorage.setItem('aToken', token);
                    localStorage.setItem('aRole', role);
                    setAToken(token);
                    setARole(role)
                    toast.success('Admin logged in successfully');
                } else {
                    toast.error(response.data.message || 'Admin login failed.');
                }

            } else if (formData.userType === 'subadmin') {
                response = await axios.post(`${backendUrl}/api/subadmin/login`, {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.success) {
                    const { token, role } = response.data.data;
                    localStorage.setItem('saToken', token);
                    localStorage.setItem('saRole', role);
                    setSaToken(token);
                    setSaRole(role);
                    toast.success('Subadmin logged in successfully');
                } else {
                    toast.error(response.data.message || 'Subadmin login failed.');
                }

            } else if (formData.userType === 'menuadmin') {
                response = await axios.post(`${backendUrl}/api/menuadmin/login`, {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data.success) {
                    const { token, role } = response.data.data;
                    localStorage.setItem('maToken', token);
                    localStorage.setItem('maRole', role);
                    setMaToken(token);
                    toast.success('Menu Admin logged in successfully');
                } else {
                    toast.error(response.data.message || 'Menuadmin login failed.');
                }
            } else {
                toast.error('Invalid user type selected.');
            }

        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-[#ffd700]">
                    {formData.userType === 'admin'
                        ? 'Admin Login'
                        : formData.userType === 'subadmin'
                        ? 'Subadmin Login'
                        : 'Menu Admin Login'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-300">
                    Welcome back to the {formData.userType} panel
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#2a2a2a] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[#ffd700]/20">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* User Type Selector */}
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium text-[#ffd700] mb-1">
                                Select User Type
                            </label>
                            <select
                                id="userType"
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-[#ffd700]/30 rounded-md bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-[#ffd700] sm:text-sm"
                            >
                                <option value="admin">Admin</option>
                                <option value="subadmin">Subadmin</option>
                                <option value="menuadmin">Menu Admin</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#ffd700]">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#ffd700]/30 rounded-md shadow-sm bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-[#ffd700] sm:text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#ffd700]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#ffd700]/30 rounded-md shadow-sm bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-[#ffd700] sm:text-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#1a1a1a] bg-[#ffd700] hover:bg-[#ffd700]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd700] disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
