'use client'

import { TaskCard } from "./TaskCard"

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
}

export function KanbanBoard() {
  const columns = [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design System',
      description: 'Create a consistent design system for the app',
      status: 'todo'
    },
    {
      id: '2',
      title: 'User Authentication',
      description: 'Implement user authentication flow',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Landing Page',
      description: 'Complete the landing page design',
      status: 'done'
    }
  ]

  return (
    <div className="h-full w-full p-4">
      <div className="flex gap-4 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[250px]">
            <div className="bg-muted mb-3 p-3 rounded-lg">
              <h3 className="font-semibold">{column.title}</h3>
            </div>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 