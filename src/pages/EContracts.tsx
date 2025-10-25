import { useState } from 'react';
import { FileText, CheckCircle, Clock, Package, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const EContracts = () => {
  const user = {
    name: 'R. Kumar',
    farmerId: '78543',
  };

  const [activeTab, setActiveTab] = useState<'active' | 'create'>('active');

  const contracts = [
    {
      id: 'AG-84521',
      commodity: 'Soybean Sale',
      status: 'Signed',
      statusColor: 'green',
      icon: CheckCircle,
      agreedPrice: 4500,
      quantity: 50,
      deliveryDate: '2025-11-15',
      buyer: 'ABC Processors',
    },
    {
      id: 'AG-84498',
      commodity: 'Cotton Bale',
      status: 'Delivery Pending',
      statusColor: 'blue',
      icon: Package,
      agreedPrice: 6200,
      quantity: 100,
      deliveryDate: '2025-11-05',
      buyer: 'National Textiles',
    },
    {
      id: 'AG-84102',
      commodity: 'Wheat Grain',
      status: 'Settled',
      statusColor: 'gray',
      icon: CheckCircle,
      agreedPrice: 2150,
      quantity: 200,
      deliveryDate: '2025-10-10',
      buyer: 'State Food Corp.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header user={user} />

      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">E-Contract Hub</h1>
          <p className="text-gray-600">
            Manage, create, and track all your agricultural sales contracts digitally.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === 'active'
                    ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Active E-Contracts
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === 'create'
                    ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Create New Contract
              </button>
            </div>
          </div>

          {activeTab === 'active' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contracts.map((contract) => {
                  const StatusIcon = contract.icon;
                  return (
                    <div
                      key={contract.id}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FileText className="w-5 h-5 text-green-700" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{contract.commodity}</h3>
                            <p className="text-xs text-gray-500">Contract ID: {contract.id}</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                          contract.status === 'Signed'
                            ? 'bg-green-100 text-green-700'
                            : contract.status === 'Delivery Pending'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {contract.status}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Agreed Price:</span>
                          <span className="font-semibold text-gray-800">
                            ₹{contract.agreedPrice} / Quintal
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold text-gray-800">
                            {contract.quantity} Quintals
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {contract.status === 'Settled' ? 'Settlement Date:' : 'Delivery Date:'}
                          </span>
                          <span className="font-semibold text-gray-800">{contract.deliveryDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Buyer:</span>
                          <span className="font-semibold text-gray-800">{contract.buyer}</span>
                        </div>
                      </div>

                      <button
                        className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                          contract.status === 'Signed'
                            ? 'bg-green-700 text-white hover:bg-green-800'
                            : contract.status === 'Delivery Pending'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {contract.status === 'Signed'
                          ? 'Track Settlement'
                          : contract.status === 'Delivery Pending'
                          ? 'View Details'
                          : 'View Receipt'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-700 rounded-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create New E-Contract</h2>
                  </div>
                  <p className="text-gray-600">
                    Fill in the details below to create a digital contract with your buyer.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Commodity
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Soybean (सोयाबीन)</option>
                        <option>Cotton (कपास)</option>
                        <option>Wheat (गेहूं)</option>
                        <option>Rice (चावल)</option>
                        <option>Maize (मक्का)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., ABC Processors"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agreed Price (₹ per Quintal)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 4500"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity (Quintals)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g., 100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Warehouse A, Pune"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quality Specifications
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter quality specifications, moisture content, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Terms
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Immediate Payment on Delivery</option>
                      <option>Payment within 7 days</option>
                      <option>Payment within 15 days</option>
                      <option>Payment within 30 days</option>
                      <option>50% Advance, 50% on Delivery</option>
                    </select>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">Contract Review</p>
                        <p className="text-sm text-amber-800">
                          After submission, both parties will need to digitally sign the contract for it
                          to become active.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                    >
                      Review & Send for Signature
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EContracts;
