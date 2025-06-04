import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths } from 'date-fns'
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'

type PostType = 'image' | 'video' | 'carousel'
type PostStatus = 'draft' | 'scheduled' | 'published'

type Post = {
  id: string
  title: string
  type: PostType
  status: PostStatus
  scheduledFor: Date
  caption?: string
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
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPost, setNewPost] = useState<Partial<Post>>({
    type: 'image',
    status: 'draft',
    scheduledFor: new Date()
  })

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

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handleCreatePost = () => {
    if (newPost.title && newPost.type && newPost.status && newPost.scheduledFor) {
      const post: Post = {
        id: Math.random().toString(36).substr(2, 9),
        title: newPost.title,
        type: newPost.type,
        status: newPost.status,
        scheduledFor: newPost.scheduledFor,
        caption: newPost.caption
      }
      setPosts([...posts, post])
      setIsModalOpen(false)
      setNewPost({
        type: 'image',
        status: 'draft',
        scheduledFor: new Date()
      })
    }
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
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousMonth}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newPost.title || ''}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value as PostType })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value as PostStatus })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Caption</label>
                  <textarea
                    value={newPost.caption || ''}
                    onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}