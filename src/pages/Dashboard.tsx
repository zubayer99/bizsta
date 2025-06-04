import { useState } from 'react'
import {
  ArrowTrendingUpIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Followers', stat: '1,897', icon: UserGroupIcon, change: '+4.75%', changeType: 'increase' },
  { name: 'Engagement Rate', stat: '3.2%', icon: HeartIcon, change: '+2.1%', changeType: 'increase' },
  { name: 'Post Reach', stat: '12.5K', icon: ArrowTrendingUpIcon, change: '+28.4%', changeType: 'increase' },
  { name: 'Messages', stat: '24', icon: ChatBubbleLeftRightIcon, change: '+8', changeType: 'increase' },
]

export default function Dashboard() {
  const [period] = useState('Last 7 days')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          An overview of your Instagram business performance
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-900">{period}</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}