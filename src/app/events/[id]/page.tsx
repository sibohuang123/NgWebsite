'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { supabase } from '@/lib/supabase'
import { Event, Comment } from '@/types/database'
import { CalendarIcon, TagIcon, ClockIcon } from '@/components/Icons'
import 'katex/dist/katex.min.css'

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState({ name: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEvent()
      fetchComments()
      incrementClickCount()
    }
  }, [id])

  async function fetchEvent() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .eq('is_draft', false)
        .single()

      if (error) throw error
      setEvent(data)
    } catch (error) {
      console.error('Error fetching event:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('event_id', id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  async function incrementClickCount() {
    try {
      await supabase.rpc('increment_click_count', {
        table_name: 'events',
        item_id: id
      })
    } catch (error) {
      console.error('Error incrementing click count:', error)
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.name.trim() || !newComment.content.trim()) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          event_id: id,
          author_name: newComment.name,
          content: newComment.content
        })

      if (error) throw error

      setNewComment({ name: '', content: '' })
      fetchComments()
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (duration: string) => {
    const match = duration.match(/(\d+):(\d+):(\d+)/)
    if (!match) return duration
    
    const hours = parseInt(match[1])
    const minutes = parseInt(match[2])
    
    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minutes`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`
    } else {
      return `${minutes} minutes`
    }
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </main>
    )
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Event not found.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Event Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">
                {event.title}
              </h1>
              {isUpcoming(event.start_date) && (
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Upcoming
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              {event.tag && (
                <div className="flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-400 font-medium">{event.tag}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">Start:</span>
                <span>{formatDate(event.start_date)} at {formatTime(event.start_date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <ClockIcon className="w-5 h-5" />
                <span className="font-medium">Duration:</span>
                <span>{formatDuration(event.duration)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">End:</span>
                <span>{formatDate(event.end_date)} at {formatTime(event.end_date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{event.click_count} views</span>
              </div>
            </div>
          </header>

          {/* Event Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 mb-12">
            <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-lg shadow-md my-6 max-w-full h-auto"
                    />
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {event.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Comments Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Write your comment..."
                  value={newComment.content}
                  onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Post Comment'}
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {comment.author_name}
                      </h4>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(comment.created_at)}
                      </time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </motion.div>
      </article>
    </main>
  )
}