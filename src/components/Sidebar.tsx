import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Content Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Influencers', href: '/influencers', icon: UserGroupIcon },
  { name: 'Shop', href: '/shop', icon: ShoppingBagIcon },
  { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
]

export default function Sidebar() {
  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon
                  className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}