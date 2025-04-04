'use client'

import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface DroppableColumnProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function DroppableColumn({ id, title, children, className }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} className={className}>
      <div className="bg-muted mb-3 p-3 rounded-lg">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div
        className={cn(
          "min-h-[200px] transition-colors",
          isOver && "bg-muted/50 rounded-lg"
        )}
      >
        {children}
      </div>
    </div>
  )
} 