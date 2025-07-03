"use client"

import { cn } from "@/lib/utils"

interface HomeOnlineLogoProps {
  className?: string
}

export function HomeOnlineLogo({ className }: HomeOnlineLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600"
      >
        <rect width="32" height="32" rx="6" fill="currentColor" />
        <path
          d="M8 20V12L16 6L24 12V20H20V16H12V20H8Z"
          fill="white"
          stroke="white"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="14" r="2" fill="currentColor" />
      </svg>
    </div>
  )
}
