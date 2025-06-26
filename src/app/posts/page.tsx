'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types/database'
import { SearchIcon, TagIcon, CalendarIcon } from '@/components/Icons'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tag && post.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredPosts(filtered)
  }, [searchQuery, posts])

  async function fetchPosts() {
    try {
      setError(null)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_draft', false)
        .order('published_date', { ascending: false })

      if (error) {
        throw error
      }
      setPosts(data || [])
      setFilteredPosts(data || [])
    } catch (error: any) {
      console.error('Error fetching posts:', error)
      if (error.code === '42P01') {
        setError('Database tables not found. Please run the database setup script in Supabase.')
      } else {
        setError('Failed to load posts. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            Posts
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title, content, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
              <p className="text-red-700 dark:text-red-400">{error}</p>
              {error.includes('Database tables not found') && (
                <div className="mt-4 text-sm text-red-600 dark:text-red-300">
                  <p className="font-semibold mb-2">To set up the database:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to your Supabase project dashboard</li>
                    <li>Navigate to the SQL Editor</li>
                    <li>Copy and run the contents of <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">supabase/schema.sql</code></li>
                    <li>Optionally run <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">supabase/demo-content.sql</code> for demo data</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Posts Grid */}
          {!error && (
            loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? 'No posts found matching your search.' : 'No posts available yet.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <Link href={`/posts/${post.id}`} className="block p-6">
                      <h2 className="text-xl font-serif font-bold mb-3 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {truncateContent(post.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          {post.tag && (
                            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                              <TagIcon className="w-4 h-4" />
                              <span>{post.tag}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(post.published_date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )
          )}
        </motion.div>
      </div>
    </main>
  )
}