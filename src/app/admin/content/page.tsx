'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Post, Event } from '@/types/database'

export default function ContentManagementPage() {
  const { isAdmin } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<'posts' | 'events'>('posts')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin')
      return
    }
    fetchContent()
  }, [isAdmin, router])

  async function fetchContent() {
    try {
      const [postsResult, eventsResult] = await Promise.all([
        supabase.from('posts').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('created_at', { ascending: false })
      ])

      setPosts(postsResult.data || [])
      setEvents(eventsResult.data || [])
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deletePost(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
      fetchContent()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  async function deleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase.from('events').delete().eq('id', id)
      if (error) throw error
      fetchContent()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  async function togglePostDraft(post: Post) {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ is_draft: !post.is_draft })
        .eq('id', post.id)
      
      if (error) throw error
      fetchContent()
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  async function toggleEventDraft(event: Event) {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_draft: !event.is_draft })
        .eq('id', event.id)
      
      if (error) throw error
      fetchContent()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
            Content Management
          </h1>
          <Link
            href="/admin/dashboard"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'posts'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'events'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Events ({events.length})
          </button>
        </div>

        {/* Content List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {activeTab === 'posts' ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.length === 0 ? (
                <p className="p-8 text-center text-gray-600 dark:text-gray-400">No posts yet</p>
              ) : (
                posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {post.title}
                          {post.is_draft && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(Draft)</span>
                          )}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatDate(post.created_at)}</span>
                          <span>{post.click_count} views</span>
                          {post.tag && <span className="text-purple-600 dark:text-purple-400">{post.tag}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => togglePostDraft(post)}
                          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                        >
                          {post.is_draft ? 'Publish' : 'Draft'}
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.length === 0 ? (
                <p className="p-8 text-center text-gray-600 dark:text-gray-400">No events yet</p>
              ) : (
                events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {event.title}
                          {event.is_draft && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(Draft)</span>
                          )}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatDate(event.start_date)}</span>
                          <span>{event.click_count} views</span>
                          {event.tag && <span className="text-purple-600 dark:text-purple-400">{event.tag}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => toggleEventDraft(event)}
                          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                        >
                          {event.is_draft ? 'Publish' : 'Draft'}
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}