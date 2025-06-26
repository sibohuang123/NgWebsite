'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Post, Event, Comment } from '@/types/database'

interface Analytics {
  totalPosts: number
  totalEvents: number
  totalComments: number
  totalViews: number
  recentComments: Comment[]
  popularPosts: Post[]
  upcomingEvents: Event[]
}

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics>({
    totalPosts: 0,
    totalEvents: 0,
    totalComments: 0,
    totalViews: 0,
    recentComments: [],
    popularPosts: [],
    upcomingEvents: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin')
      return
    }
    fetchAnalytics()
  }, [isAdmin, router])

  async function fetchAnalytics() {
    try {
      // Fetch counts
      const [postsResult, eventsResult, commentsResult] = await Promise.all([
        supabase.from('posts').select('id, click_count', { count: 'exact' }),
        supabase.from('events').select('id, click_count', { count: 'exact' }),
        supabase.from('comments').select('id', { count: 'exact' })
      ])

      // Calculate total views
      const totalPostViews = postsResult.data?.reduce((sum, post) => sum + post.click_count, 0) || 0
      const totalEventViews = eventsResult.data?.reduce((sum, event) => sum + event.click_count, 0) || 0

      // Fetch recent comments
      const { data: recentComments } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      // Fetch popular posts
      const { data: popularPosts } = await supabase
        .from('posts')
        .select('*')
        .order('click_count', { ascending: false })
        .limit(5)

      // Fetch upcoming events
      const { data: upcomingEvents } = await supabase
        .from('events')
        .select('*')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(5)

      setAnalytics({
        totalPosts: postsResult.count || 0,
        totalEvents: eventsResult.count || 0,
        totalComments: commentsResult.count || 0,
        totalViews: totalPostViews + totalEventViews,
        recentComments: recentComments || [],
        popularPosts: popularPosts || [],
        upcomingEvents: upcomingEvents || []
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteComment(commentId: string) {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

      if (error) throw error
      fetchAnalytics()
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/posts/new"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl text-center font-semibold transition-colors"
          >
            Create New Post
          </Link>
          <Link
            href="/admin/events/new"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl text-center font-semibold transition-colors"
          >
            Create New Event
          </Link>
          <Link
            href="/admin/content"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl text-center font-semibold transition-colors"
          >
            Manage Content
          </Link>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalPosts}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Events</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalEvents}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Comments</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalComments}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalViews}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-serif font-bold mb-4 text-gray-900 dark:text-white">Recent Comments</h2>
            <div className="space-y-4">
              {analytics.recentComments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No comments yet</p>
              ) : (
                analytics.recentComments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{comment.author_name}</p>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Popular Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-serif font-bold mb-4 text-gray-900 dark:text-white">Popular Posts</h2>
            <div className="space-y-4">
              {analytics.popularPosts.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No posts yet</p>
              ) : (
                analytics.popularPosts.map((post) => (
                  <div key={post.id} className="flex justify-between items-center">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {post.title}
                    </Link>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{post.click_count} views</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}