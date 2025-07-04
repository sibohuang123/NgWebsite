import Link from 'next/link'
import Image from 'next/image'
import BrainIcon from './BrainIcon'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="text-purple-600 dark:text-purple-400">
                <BrainIcon className="w-8 h-8" />
              </div>
              <span className="text-xl font-serif font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                NeuroGeneration
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto md:mx-0">
              Empowering teens to explore neuroscience and psychology, shaping the future of brain and mind research.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">About Us</Link></li>
              <li><Link href="/posts" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Blog</Link></li>
              <li><Link href="/events" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Events</Link></li>
              <li><Link href="/community-database" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">Community Database</Link></li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect With Us</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Follow us on social media
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {/* Xiaohongshu */}
              <a
                href="https://www.xiaohongshu.com/user/profile/6804845a000000000e012e1c"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-110"
                aria-label="Xiaohongshu"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src="/XiaohongshuLOGO.png"
                    alt="Xiaohongshu"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xs font-medium">RedNote</span>
              </a>
              
              {/* WeChat */}
              <a
                href="#"
                className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-110"
                aria-label="WeChat"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src="/wechatLogo.png"
                    alt="WeChat"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xs font-medium">WeChat</span>
              </a>
              
              {/* Instagram */}
              <a
                href="#"
                className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src="/instagramLogo.png"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xs font-medium">Instagram</span>
              </a>
              
              {/* Twitter */}
              <a
                href="#"
                className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white dark:text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} NeuroGeneration. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Made with ❤️ by teens passionate about neuroscience and psychology
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}