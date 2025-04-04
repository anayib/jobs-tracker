'use client'

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TaskCard } from "./TaskCard"
import { Assignee } from "@/types/assignee"

interface DraggableTaskCardProps {
  task: {
    id: string
    title: string
    description: string
    assignee?: Assignee
    dueDate?: Date
  }
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
    opacity: isDragging ? 0.5 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="cursor-grab active:cursor-grabbing touch-none"
    >
      <TaskCard
        title={task.title}
        description={task.description}
        assignee={task.assignee}
        dueDate={task.dueDate}
        onAssigneeChange={onAssigneeChange}
        availableAssignees={availableAssignees}
      />
    </div>
  )
} 