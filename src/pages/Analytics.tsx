import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const followersData = [
  { date: '2023-11-01', followers: 1500 },
  { date: '2023-11-02', followers: 1550 },
  { date: '2023-11-03', followers: 1580 },
  { date: '2023-11-04', followers: 1620 },
  { date: '2023-11-05', followers: 1700 },
  { date: '2023-11-06', followers: 1750 },
  { date: '2023-11-07', followers: 1897 },
]

const engagementData = [
  { type: 'Likes', value: 2456 },
  { type: 'Comments', value: 874 },
  { type: 'Saves', value: 432 },
  { type: 'Shares', value: 321 },
]

const audienceData = [
  { name: '18-24', value: 30 },
  { name: '25-34', value: 40 },
  { name: '35-44', value: 20 },
  { name: '45+', value: 10 },
]

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e']

const timeRanges = ['7 days', '30 days', '3 months', '6 months']

export default function Analytics() {
  const [selectedRange] = useState('7 days')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="mt-2 text-sm text-gray-700">
          Detailed insights about your Instagram performance
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Follower Growth</h2>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={followersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="followers"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Engagement Breakdown</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Audience Demographics</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {audienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Top Performing Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((post) => (
            <div key={post} className="border rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100"></div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>November {post + 10}, 2023</span>
                  <span>{(Math.random() * 1000).toFixed(0)} likes</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  Example caption for this Instagram post showing engagement metrics and performance data.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}