import React from 'react'
import Link from 'next/link'
import { Brain } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t bg-muted">
    <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          <span className="text-lg font-bold">AI Concepts</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Making artificial intelligence concepts accessible to everyone.
        </p>
      </div>
      <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div className="grid gap-3 text-sm">
          <h3 className="font-medium">Learn</h3>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Topics
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Courses
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Resources
          </Link>
        </div>
        <div className="grid gap-3 text-sm">
          <h3 className="font-medium">Company</h3>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="grid gap-3 text-sm">
          <h3 className="font-medium">Legal</h3>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
      </nav>
    </div>
    <div className="container flex flex-col items-center justify-between gap-4 border-t py-6 md:h-16 md:flex-row md:py-0">
      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
        © {new Date().getFullYear()} AI Concepts. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <span className="sr-only">Twitter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <span className="sr-only">GitHub</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <span className="sr-only">LinkedIn</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer