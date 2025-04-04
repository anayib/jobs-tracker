'use client'

import { TaskCard } from "./TaskCard"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "./TaskDialog"
import { PlusIcon } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  assignee?: {
    id: string
    name: string
    image?: string
  }
  dueDate?: Date
}

export function KanbanBoard() {
  const columns = [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  const availableAssignees = [
    {
      id: '1',
      name: 'Alex',
      image: 'https://github.com/shadcn.png'
    },
    {
      id: '2',
      name: 'Sarah',
      image: 'https://github.com/sarah.png'
    },
    {
      id: '3',
      name: 'Mike',
      image: 'https://github.com/mike.png'
    },
    {
      id: '4',
      name: 'Emma',
      image: 'https://github.com/emma.png'
    }
  ]

  const initialTasks: Task[] = [
    {
      id: '1',
      title: 'Design System',
      description: 'Create a consistent design system for the app',
      status: 'todo',
      assignee: availableAssignees[0],
      dueDate: new Date('2024-04-01')
    },
    {
      id: '2',
      title: 'User Authentication',
      description: 'Implement user authentication flow',
      status: 'in-progress',
      assignee: availableAssignees[1],
      dueDate: new Date('2024-03-28')
    },
    {
      id: '3',
      title: 'Landing Page',
      description: 'Complete the landing page design',
      status: 'done',
      assignee: availableAssignees[2],
      dueDate: new Date('2024-03-25')
    }
  ]

  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()

  const handleCreateTask = (values: any) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: values.title,
      description: values.description,
      status: 'todo',
      assignee: values.assigneeId ? availableAssignees.find(a => a.id === values.assigneeId) : undefined,
      dueDate: values.dueDate
    }
    setTasks([...tasks, newTask])
    setDialogOpen(false)
  }

  const handleEditTask = (values: any) => {
    if (!selectedTask) return
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === selectedTask.id
          ? {
              ...task,
              title: values.title,
              description: values.description,
              assignee: values.assigneeId ? availableAssignees.find(a => a.id === values.assigneeId) : undefined,
              dueDate: values.dueDate
            }
          : task
      )
    )
    setDialogOpen(false)
    setSelectedTask(undefined)
  }

  const handleDeleteTask = () => {
    if (!selectedTask) return
    setTasks(currentTasks => currentTasks.filter(task => task.id !== selectedTask.id))
    setDialogOpen(false)
    setSelectedTask(undefined)
  }

  const openCreateDialog = () => {
    setSelectedTask(undefined)
    setDialogOpen(true)
  }

  const openEditDialog = (task: Task) => {
    setSelectedTask(task)
    setDialogOpen(true)
  }

  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={openCreateDialog}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
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
                  <div key={task.id} onClick={() => openEditDialog(task)} className="cursor-pointer">
                    <TaskCard
                      title={task.title}
                      description={task.description}
                      assignee={task.assignee}
                      dueDate={task.dueDate}
                      onAssigneeChange={(assigneeName) => {
                        const assignee = availableAssignees.find(a => a.name === assigneeName)
                        setTasks(currentTasks =>
                          currentTasks.map(t =>
                            t.id === task.id ? { ...t, assignee } : t
                          )
                        )
                      }}
                      availableAssignees={availableAssignees}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
        availableAssignees={availableAssignees}
        onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
        mode={selectedTask ? 'edit' : 'create'}
      />
    </div>
  )
} 