'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Task } from "@/types"
import { Assignee } from "@/types/assignee"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface TaskCardProps {
  task: Task
  isDroppable?: boolean
  className?: string
  onAssigneeChange?: (assigneeName: string) => void
  availableAssignees?: Assignee[]
  onClick?: () => void
}

export function TaskCard({ 
  task, 
  isDroppable = false, 
  className,
  onAssigneeChange,
  availableAssignees = [],
  onClick
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: task
  })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `droppable-${task.id}`,
    disabled: !isDroppable
  })

  const setRefs = (node: HTMLDivElement | null) => {
    setNodeRef(node)
    if (isDroppable) {
      setDroppableRef(node)
    }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Card
      ref={setRefs}
      style={style}
      onClick={onClick}
      className={cn(
        "w-full shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        isOver && "border-2 border-primary",
        className
      )}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{task.title}</CardTitle>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {onAssigneeChange && (
              <Select value={task.assignee?.name || ""} onValueChange={onAssigneeChange}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Assign to...">
                    {task.assignee && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableAssignees.map((person) => (
                    <SelectItem key={person.id} value={person.name}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{person.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {task.dueDate && (
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{format(task.dueDate, 'MMM d')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 