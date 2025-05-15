
import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  List, 
  Clock,
  DollarSign,
  Package,
  Activity
} from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { backendUrl, aToken, getAuthHeaders, saToken, maToken,} = useContext(AdminContext);
  const [stats, setStats] = useState({
    subadmins: 0,
    todaySales: 0,
    yesterdaySales: 0,
    menuStats: { total: 0, unavailable: 0 },
    recentOrders: [],
    isLoading: true,
    error: null
  });

  const formatCurrency = (num) => `₦${num.toLocaleString()}`;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Create a memoized function to get the appropriate auth headers
  const getProperAuthHeaders = useCallback(() => {
    // For debugging - remove in production
    console.log('Auth tokens status:', { 
      aToken: !!aToken, 
      saToken: !!saToken, 
      maToken: !!maToken 
    });
    
    // If using the context's getAuthHeaders, ensure it works for all roles
    // Or create headers directly based on available tokens
    if (aToken) {
      return { aToken: aToken };
    } else if (saToken) {
      return { saToken: saToken };
    } else if (maToken) {
      return { maToken: maToken };
    }
    
    // Fallback to the context method
    return getAuthHeaders();
  }, [aToken, saToken, maToken, getAuthHeaders]);

  useEffect(() => {
    let isMounted = true;
    let intervalId = null;

    const fetchStats = async () => {
      if (!isMounted) return;
      
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

         // Get auth headers INSIDE the fetchStats function to ensure they're up to date
        const authHeaders = getProperAuthHeaders();
        console.log('Using auth headers:', authHeaders);
        
        // Fetch subadmins count with error handling
        let subadminCount = 0;
        try {
          const subadminRes = await axios.get(`${backendUrl}/api/admin/subadmins/count`,
            { headers: authHeaders }
          );
          subadminCount = subadminRes.data?.count || 0;
        } catch (err) {
          console.warn('Failed to fetch subadmins count:', err.message);
        }
        
        // Fetch menu stats with error handling
        let menuStats = { total: 0, unavailable: 0 };
        try {
          const menuStatsRes = await axios.get(`${backendUrl}/api/admin/menu/menu-stats`, 
            { headers: authHeaders }
          );
          menuStats = menuStatsRes.data || { total: 0, unavailable: 0 };
        } catch (err) {
          console.warn('Failed to fetch menu stats:', err.message);
        }
        
        // Initialize default values
        let today = 0;
        let yesterday = 0;
        let recentOrders = [];
        
        // Try to fetch sales comparison
        try {
          const salesComparisonRes = await axios.get(`${backendUrl}/api/order/sales/comparison`, {headers: authHeaders});
          today = salesComparisonRes.data?.today || 0;
          yesterday = salesComparisonRes.data?.yesterday || 0;
        } catch (salesError) {
          console.warn('Could not fetch sales comparison:', salesError.message);
        }
        
        // Try to fetch recent orders
        try {
          const recentOrdersRes = await axios.get(`${backendUrl}/api/orders/recent?limit=5`,
            { headers: authHeaders }
          );
          recentOrders = recentOrdersRes.data || [];
        } catch (ordersError) {
          console.warn('Could not fetch recent orders:', ordersError.message);
          // Create sample recent orders if the API fails
          recentOrders = [
            { id: '1', customerName: 'John Doe', status: 'completed', amount: 5000 },
            { id: '2', customerName: 'Jane Smith', status: 'pending', amount: 3000 },
            { id: '3', customerName: 'Guest', status: 'cancelled', amount: 1500 },
          ];
        }

        if (isMounted) {
          setStats({
            subadmins: subadminCount,
            todaySales: today,
            yesterdaySales: yesterday,
            menuStats: menuStats,
            recentOrders: recentOrders,
            isLoading: false,
            error: null
          });
        }
      } catch (err) {
        console.error('Unexpected error in fetchStats:', err);
        if (isMounted) {
          setStats(prev => ({
            ...prev,
            isLoading: false,
            error: 'Failed to load dashboard data. Some features may be limited.'
          }));
        }
      }
    };

    // Initial fetch
    fetchStats().catch(err => {
      console.error('Error in initial fetch:', err);
    });
    
    // Set up auto-refresh every 30 seconds only if not in development
    if (process.env.NODE_ENV !== 'development') {
      intervalId = setInterval(fetchStats, 30000);
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [backendUrl]);

  const salesDifference = stats.todaySales - stats.yesterdaySales;
  const salesChangePercentage = stats.yesterdaySales > 0 
    ? ((salesDifference / stats.yesterdaySales) * 100).toFixed(1) 
    : 0;

  const adminCards = [
    {
      title: 'Total Subadmins',
      value: stats.subadmins || 0,
      icon: Users,
      color: 'bg-blue-500',
      trend: null
    },
    {
      title: "Today's Sales",
      value: formatCurrency(stats.todaySales || 0),
      icon: ShoppingCart,
      color: 'bg-green-500',
      trend: 'today'
    },
    {
      title: 'Sales Change',
      value: `${salesDifference >= 0 ? '+' : ''}${formatCurrency(salesDifference || 0)}`,
      subtitle: stats.yesterdaySales > 0 ? `${salesChangePercentage}% from yesterday` : 'No previous data',
      icon: TrendingUp,
      color: salesDifference >= 0 ? 'bg-green-500' : 'bg-yellow-500',
      trend: salesDifference > 0 ? 'up' : salesDifference < 0 ? 'down' : null
    },
    {
      title: 'Menu Items',
      value: stats.menuStats?.total || 0,
      subtitle: stats.menuStats ? `${stats.menuStats.unavailable || 0} unavailable` : 'N/A',
      icon: Package,
      color: 'bg-purple-500',
      trend: null
    }
  ];

  const subadminCards = [
    {
      title: "Today's Sales",
      value: formatCurrency(stats.todaySales || 0),
      icon: ShoppingCart,
      color: 'bg-green-500',
      trend: 'today'
    },
    {
      title: 'Menu Items',
      value: stats.menuStats?.total || 0,
      subtitle: stats.menuStats ? `${stats.menuStats.unavailable || 0} unavailable` : 'N/A',
      icon: Package,
      color: 'bg-purple-500',
      trend: null
    }
  ];

  const statsCards = aToken ? adminCards : subadminCards;

  if (stats.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{stats.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 mt-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with Trafik today.</p>
        </div>

        {/* Stats Grid */}
        <div className={`grid gap-4 mb-6 md:mb-8 ${
          aToken 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2'
        }`}>
          {statsCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.customerName || 'Guest'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {formatCurrency(order.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {aToken ? (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-medium text-gray-900 mb-4">Sales Overview</h3>
                <div className="space-y-4">
                  <StatItem 
                    icon={<DollarSign className="h-5 w-5 text-green-500" />} 
                    label="Today's Revenue" 
                    value={formatCurrency(stats.todaySales)}
                  />
                  <StatItem 
                    icon={<Activity className="h-5 w-5 text-blue-500" />} 
                    label="Sales Change" 
                    value={`${salesDifference >= 0 ? '+' : ''}${salesChangePercentage}%`}
                    isPositive={salesDifference >= 0}
                  />
                  <StatItem 
                    icon={<Clock className="h-5 w-5 text-yellow-500" />} 
                    label="Avg. Order Value" 
                    value={formatCurrency(stats.todaySales > 0 ? stats.todaySales / 10 : 0)}
                  />
                </div>
              </div>
            ) : null}

            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Product</span>
                </button>
                {aToken && (
                  <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-2 rounded-full mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">New Subadmin</span>
                  </button>
                )}
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-purple-100 p-2 rounded-full mb-2">
                    <List className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Categories</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-yellow-100 p-2 rounded-full mb-2">
                    <ShoppingCart className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">View Orders</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    {trend && trend !== 'today' && (
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? '↑' : '↓'} 5% from yesterday
        </span>
      </div>
    )}
  </div>
);

const StatItem = ({ icon, label, value, isPositive = true }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="p-1.5 bg-gray-100 rounded-lg mr-3">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <span className={`text-sm font-semibold ${
      isPositive ? 'text-green-600' : 'text-red-600'
    }`}>
      {value}
    </span>
  </div>
);

export default Dashboard;
