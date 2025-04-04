'use client'

import { Card } from "@/components/ui/card"

interface TaskCardProps {
  title: string
  description: string
}

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <Card className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-move">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
} 