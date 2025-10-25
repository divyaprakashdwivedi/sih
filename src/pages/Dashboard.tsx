import { TrendingUp, TrendingDown, AlertCircle, Sprout, Wheat, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Dashboard = () => {
  const user = {
    name: 'R. Kumar',
    farmerId: '78543',
  };

  const commodities = [
    {
      name: 'Soybean',
      hindi: 'सोयाबीन',
      price: 4520.50,
      change: 15.75,
      percentage: 0.35,
      icon: Sprout,
    },
    {
      name: 'Cotton',
      hindi: 'कपास',
      price: 6200.00,
      change: -25.50,
      percentage: -0.41,
      icon: Database,
    },
    {
      name: 'Wheat',
      hindi: 'गेहूं',
      price: 2150.00,
      change: 8.25,
      percentage: 0.38,
      icon: Wheat,
    },
  ];

  const alerts = [
    {
      type: 'price',
      message: 'Soybean prices expected to rise 5% in next 15 days',
      priority: 'high',
    },
    {
      type: 'weather',
      message: 'Heavy rainfall predicted in Maharashtra next week',
      priority: 'medium',
    },
    {
      type: 'contract',
      message: 'Cotton contract #AG-84498 delivery due in 3 days',
      priority: 'high',
    },
  ];

  const activeContracts = [
    {
      id: 'AG-84521',
      commodity: 'Soybean',
      status: 'Signed',
      price: 4500,
      quantity: 50,
      deliveryDate: '2025-11-15',
    },
    {
      id: 'AG-84498',
      commodity: 'Cotton',
      status: 'Delivery Pending',
      price: 6200,
      quantity: 100,
      deliveryDate: '2025-11-05',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header user={user} />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's your market overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {commodities.map((commodity) => {
            const Icon = commodity.icon;
            const isPositive = commodity.change > 0;

            return (
              <div
                key={commodity.name}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Icon className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{commodity.name}</h3>
                      <p className="text-sm text-gray-500">{commodity.hindi}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-800">
                      ₹{commodity.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">/ Quintal</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {commodity.change} ({isPositive ? '+' : ''}
                      {commodity.percentage}%)
                    </span>
                    <span className="text-xs text-gray-500">Today</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Market Alerts</h2>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>

            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.priority === 'high'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Active E-Contracts</h2>
              <Link
                to="/e-contracts"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {activeContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{contract.commodity}</h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        contract.status === 'Signed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {contract.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Contract ID: {contract.id}</p>
                    <p>
                      ₹{contract.price} / Quintal • {contract.quantity} Quintals
                    </p>
                    <p>Delivery: {contract.deliveryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/simulate-trade"
            className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-bold mb-2">Simulate Hedge</h3>
            <p className="text-green-100 mb-4">
              Practice hedging strategies without any real-world risk
            </p>
            <span className="inline-block bg-white text-green-700 px-4 py-2 rounded-lg font-semibold">
              Start Trading →
            </span>
          </Link>

          <Link
            to="/price-prediction"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-bold mb-2">View AI Forecast</h3>
            <p className="text-blue-100 mb-4">
              Get AI-driven price predictions for the next 90 days
            </p>
            <span className="inline-block bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold">
              View Predictions →
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
