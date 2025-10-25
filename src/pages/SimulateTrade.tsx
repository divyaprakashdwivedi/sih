import { useState } from 'react';
import { TrendingUp, TrendingDown, Shield, BarChart3 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const SimulateTrade = () => {
  const user = {
    name: 'R. Kumar',
    farmerId: '7854',
  };

  const [selectedCommodity, setSelectedCommodity] = useState('Soybean');
  const [position, setPosition] = useState<'sell' | 'buy'>('sell');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');
  const [quantity, setQuantity] = useState('100');
  const [targetPrice, setTargetPrice] = useState('4600');
  const [unit, setUnit] = useState('Quintals');
  const [contractMonth, setContractMonth] = useState('November 2025');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const commodities = [
    { name: 'Soybean', hindi: 'सोयाबीन', currentPrice: 4520.50, change: 15.75, percentage: 0.35 },
    { name: 'Cotton', hindi: 'कपास', currentPrice: 6200.0, change: -25.5, percentage: -0.41 },
    { name: 'Wheat', hindi: 'गेहूं', currentPrice: 2150.0, change: 8.25, percentage: 0.38 },
  ];

  const currentCommodity = commodities.find((c) => c.name === selectedCommodity)!;
  const isPositive = currentCommodity.change > 0;

  const calculateExposure = () => {
    const price = orderType === 'market' ? currentCommodity.currentPrice : parseFloat(targetPrice) || 0;
    return (parseFloat(quantity) || 0) * price;
  };

  const handleConfirmTrade = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header user={user} />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulate a Hedge</h1>
          <p className="text-gray-600">Practice hedging strategies without any real-world risk.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  1. Select Commodity
                </label>
                <select
                  value={selectedCommodity}
                  onChange={(e) => setSelectedCommodity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                >
                  {commodities.map((commodity) => (
                    <option key={commodity.name} value={commodity.name}>
                      {commodity.name} ({commodity.hindi})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    2. Your Position
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPosition('sell')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        position === 'sell'
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <TrendingDown className="w-5 h-5 inline mr-2" />
                      Sell / Short
                    </button>
                    <button
                      onClick={() => setPosition('buy')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        position === 'buy'
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <TrendingUp className="w-5 h-5 inline mr-2" />
                      Buy / Long
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    3. Order Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrderType('market')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        orderType === 'market'
                          ? 'bg-gray-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setOrderType('limit')}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        orderType === 'limit'
                          ? 'bg-green-700 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    4. Quantity to Hedge
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 100"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>Quintals</option>
                      <option>Tonnes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    5. Target Price (₹)
                  </label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Set your price"
                    disabled={orderType === 'market'}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg ${
                      orderType === 'market' ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  6. Contract Month
                </label>
                <select
                  value={contractMonth}
                  onChange={(e) => setContractMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                >
                  <option>November 2025</option>
                  <option>December 2025</option>
                  <option>January 2026</option>
                  <option>February 2026</option>
                  <option>March 2026</option>
                </select>
              </div>

              <button
                onClick={handleConfirmTrade}
                className="w-full bg-green-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Confirm Virtual Hedge
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Market Snapshot: {selectedCommodity}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Market Price</p>
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{currentCommodity.currentPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600">Today's Change</p>
                  <div className="flex items-center gap-1">
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
                      {currentCommodity.change} ({isPositive ? '+' : ''}
                      {currentCommodity.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="h-32 flex items-end justify-between gap-1">
                    {[65, 72, 58, 80, 75, 85, 78, 90, 88, 95, 92, 100].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-md p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Action:</span>
                  <span
                    className={`font-semibold ${
                      position === 'sell' ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {position === 'sell' ? 'Sell / Short' : 'Buy / Long'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold text-gray-800">
                    {quantity || 0} {unit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Target Price:</span>
                  <span className="font-semibold text-gray-800">
                    ₹
                    {orderType === 'market'
                      ? currentCommodity.currentPrice.toFixed(2)
                      : (parseFloat(targetPrice) || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Contract:</span>
                  <span className="font-semibold text-gray-800">{contractMonth.split(' ')[0]} 2025</span>
                </div>

                <div className="pt-3 border-t-2 border-amber-300 flex justify-between items-baseline">
                  <span className="text-gray-700 font-semibold">Virtual Exposure:</span>
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{calculateExposure().toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <p className="text-xs text-gray-600 text-center pt-2">
                  This is a simulated value. No real funds are involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl animate-scale-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Trade Confirmed!</h3>
              <p className="text-gray-600 mb-4">
                Your virtual hedge has been placed successfully.
              </p>
              <p className="text-sm text-gray-500">
                View your position in the Simulated Portfolio
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulateTrade;
