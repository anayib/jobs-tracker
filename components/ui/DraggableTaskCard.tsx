'use client'

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskCard } from "./TaskCard"
import { Assignee } from "@/types/assignee"
import { Task } from "@/types"

interface DraggableTaskCardProps {
  task: Task
  onClick: () => void
  onAssigneeChange: (assigneeName: string) => void
  availableAssignees: Assignee[]
}

export function DraggableTaskCard({
  task,
  onClick,
  onAssigneeChange,
  availableAssignees,
}: DraggableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing touch-none ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => !isDragging && onClick()}
    >
      <TaskCard
        task={task}
        onAssigneeChange={onAssigneeChange}
        availableAssignees={availableAssignees}
        onClick={onClick}
      />
    </div>
  )
} 