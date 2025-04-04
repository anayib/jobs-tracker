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
    <div ref={setNodeRef} className={cn("flex flex-col h-[calc(100vh-8rem)] bg-muted/30 rounded-lg p-3", className)}>
      <div className="bg-muted mb-3 p-3 rounded-lg sticky top-0 z-10">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div
        className={cn(
          "flex-1 overflow-y-auto pr-2 space-y-2",
          isOver && "bg-muted/50 rounded-lg"
        )}
      >
        {children}
      </div>
    </div>
  )
} 