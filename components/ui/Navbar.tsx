'use client'

import { ThemeToggle } from "../theme-toggle"
import { LanguageSelector } from "./LanguageSelector"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-30 items-center px-2 container mx-auto">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-1">Job Application Board</h1>
          <p className="text-sm text-muted-foreground">Manage your job application process efficiently</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </nav>
  )
} 