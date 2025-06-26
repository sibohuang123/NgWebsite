'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarButtons = [
    { label: 'B', action: () => insertText('**', '**'), title: 'Bold' },
    { label: 'I', action: () => insertText('*', '*'), title: 'Italic' },
    { label: 'Link', action: () => insertText('[', '](url)'), title: 'Link' },
    { label: 'Code', action: () => insertText('`', '`'), title: 'Inline Code' },
    { label: 'Quote', action: () => insertText('> ', ''), title: 'Quote' },
    { label: 'LaTeX', action: () => insertText('$', '$'), title: 'Inline LaTeX' },
    { label: 'LaTeX Block', action: () => insertText('$$\n', '\n$$'), title: 'LaTeX Block' },
  ]

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => setActiveTab('write')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'write'
              ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Preview
        </button>
      </div>

      {activeTab === 'write' ? (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            {toolbarButtons.map((button) => (
              <button
                key={button.label}
                type="button"
                onClick={button.action}
                title={button.title}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Editor */}
          <textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[400px] p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
          />
        </>
      ) : (
        /* Preview */
        <div className="min-h-[400px] p-4 bg-white dark:bg-gray-900">
          <div className="markdown-content prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {value || '*Nothing to preview*'}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}