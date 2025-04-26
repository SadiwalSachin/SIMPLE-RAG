"use client"

import React from 'react'
import { Brain } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Header = () => {

    let pathName = usePathname()

  return (
    <header className="sticky px-5 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-[#282F32]">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain color='#FEFEFE' className="h-6 w-6" />
        <span className="text-xl font-bold text-[#FEFEFE]">QnA with Content</span>
      </div>
    </div>
  </header>
  )
}

export default Header