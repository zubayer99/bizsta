import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns'
import { PlusIcon } from '@heroicons/react/24/outline'

type Post = {
  id: string
  title: string
  type: 'image' | 'video' | 'carousel'
  status: 'draft' | 'scheduled' | 'published'
  scheduledFor: Date
}

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'New Product Launch',
    type: 'image',
    status: 'scheduled',
    scheduledFor: new Date(2023, 11, 15, 10, 0)
  },
  {
    id: '2',
    title: 'Customer Testimonial',
    type: 'video',
    status: 'draft',
    scheduledFor: new Date(2023, 11, 18, 14, 30)
  }
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts] = useState<Post[]>(samplePosts)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Content Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Plan and schedule your Instagram content
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, dayIdx) => {
            const dayPosts = getPostsForDay(day)
            
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] bg-white px-3 py-2 ${
                  !isSameMonth(day, currentDate)
                    ? 'bg-gray-50 text-gray-400'
                    : isToday(day)
                    ? 'bg-yellow-50'
                    : ''
                }`}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    isToday(day)
                      ? 'bg-indigo-600 font-semibold text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {format(day, 'd')}
                </time>
                <div className="mt-2 space-y-1">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`text-xs rounded px-2 py-1 ${
                        post.status === 'draft'
                          ? 'bg-gray-100 text-gray-700'
                          : post.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {post.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}