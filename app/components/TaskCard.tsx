'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Assignee } from "@/types/assignee"

interface TaskCardProps {
  title: string
  description: string
  assignee?: Assignee
  dueDate?: Date
  onAssigneeChange: (value: string) => void
  availableAssignees: Assignee[]
  className?: string
}

export function TaskCard({ 
  title, 
  description, 
  assignee, 
  dueDate,
  onAssigneeChange,
  availableAssignees,
  className
}: TaskCardProps) {
  return (
    <Card className={cn("w-full shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Select value={assignee?.name || ""} onValueChange={onAssigneeChange}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Assign to...">
                  {assignee && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={assignee.image} alt={assignee.name} />
                        <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{assignee.name}</span>
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
          </div>
          {dueDate && (
            <div className="flex items-center text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{format(dueDate, 'MMM d')}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 