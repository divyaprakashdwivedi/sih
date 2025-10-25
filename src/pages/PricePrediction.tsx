import { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const PricePrediction = () => {
  const user = {
    name: 'R. Kumar',
    farmerId: '7854',
  };

  const [selectedCommodity, setSelectedCommodity] = useState('Soybean');
  const [timeframe, setTimeframe] = useState<'30' | '60' | '90'>('90');

  const commodities = [
    {
      name: 'Soybean',
      hindi: 'सोयाबीन',
      currentPrice: 4520.5,
      predictedPrice: 4850.75,
      change: 12.5,
      percentage: 0.26,
      confidence: 85,
      outlook: 'Moderate Rise Expected',
      rationale:
        'The forecast is based on strong monsoon predictions, increased international demand, and favorable government policies. While short-term volatility is possible, the 90-day outlook remains positive.',
    },
    {
      name: 'Cotton',
      hindi: 'कपास',
      currentPrice: 6200.0,
      predictedPrice: 5950.0,
      change: -250.0,
      percentage: -4.03,
      confidence: 72,
      outlook: 'Slight Decline Expected',
      rationale:
        'Global cotton surplus and decreased textile demand may put downward pressure on prices. Monitor international market trends closely.',
    },
    {
      name: 'Wheat',
      hindi: 'गेहूं',
      currentPrice: 2150.0,
      predictedPrice: 2280.0,
      change: 130.0,
      percentage: 6.05,
      confidence: 78,
      outlook: 'Steady Growth Expected',
      rationale:
        'Strong domestic consumption and government procurement programs support price stability. Weather conditions remain favorable.',
    },
  ];

  const currentCommodity = commodities.find(
    (c) => c.name === selectedCommodity
  )!;
  const isPositive = currentCommodity.change > 0;

  const generateChartData = () => {
    const points = 60;
    const data = [];
    const basePrice = currentCommodity.currentPrice;
    const targetPrice = currentCommodity.predictedPrice;
    const volatility = 50;

    for (let i = 0; i < points; i++) {
      const progress = i / points;
      const trend = basePrice + (targetPrice - basePrice) * progress;
      const noise = (Math.random() - 0.5) * volatility * (1 - progress * 0.5);
      data.push({
        date: `Day ${i + 1}`,
        price: +(trend + noise).toFixed(2),
      });
    }

    // Add 10 predicted points for future
    for (let i = 1; i <= 10; i++) {
      const futureProgress = i / 10;
      const futurePrice =
        currentCommodity.predictedPrice +
        (Math.random() - 0.5) * volatility * 0.2;
      data.push({
        date: `Predicted ${i * 3}d`,
        price: +futurePrice.toFixed(2),
      });
    }

    return data;
  };

  const chartData = generateChartData();
  const prices = chartData.map((p) => p.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header user={user} />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Price Prediction Detail
          </h1>
          <p className="text-gray-600">
            AI-driven price forecasts for your commodities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCommodity} (
                    {
                      commodities.find(
                        (c) => c.name === selectedCommodity
                      )?.hindi
                    }
                    ) Price Forecast
                  </h2>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-4xl font-bold text-gray-800">
                      ₹{currentCommodity.predictedPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        className={`w-5 h-5 ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                      <span
                        className={`text-lg font-semibold ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        ₹{currentCommodity.change.toFixed(2)} (
                        {currentCommodity.percentage}%)
                      </span>
                    </div>
                    <span className="text-gray-500">/ Quintal</span>
                  </div>
                </div>

                <select
                  value={selectedCommodity}
                  onChange={(e) => setSelectedCommodity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {commodities.map((commodity) => (
                    <option key={commodity.name} value={commodity.name}>
                      {commodity.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 mb-6">
                {(['30', '60', '90'] as const).map((days) => (
                  <button
                    key={days}
                    onClick={() => setTimeframe(days)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      timeframe === days
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {days} Day
                  </button>
                ))}
              </div>

              {/* Interactive Graph */}
              <div className="relative h-96 bg-gradient-to-b from-green-50 to-white rounded-lg p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorPrice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="100%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      domain={[minPrice * 0.95, maxPrice * 1.05]}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                      }}
                      formatter={(value) => [`₹${value}`, 'Price']}
                      labelFormatter={(label) => `${label}`}
                    />

                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#374151"
                      fill="url(#colorPrice)"
                      strokeWidth={2}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, stroke: '#10b981', strokeWidth: 2 }}
                      activeDot={{ r: 5, stroke: '#059669' }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-gray-700"></div>
                      <span className="text-gray-600">Historical Price</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-green-600 border-dashed border-t-2 border-green-600"></div>
                      <span className="text-gray-600">AI Forecast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right-side Insights */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-green-700" />
                <h3 className="text-lg font-bold text-gray-800">AI Insights</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Predicted Outlook</p>
                  <p className="text-xl font-bold text-green-700">
                    {currentCommodity.outlook}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Confidence Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentCommodity.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-green-700">
                      {currentCommodity.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on market volatility and historical trends.
                  </p>
                </div>

                <div className="pt-4 border-t border-green-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Target className="w-5 h-5 text-green-700 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        Suggested Action
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        {isPositive
                          ? 'Consider Hedging a Portion of Your Crop'
                          : 'Monitor Market Closely'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/simulate-trade"
                    className="block w-full bg-green-700 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-800 transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Simulate Hedge Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-800">AI Rationale</h3>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {currentCommodity.rationale}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricePrediction;
