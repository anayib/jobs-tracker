'use client'

import { TaskCard } from "./ui/TaskCard"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "./ui/TaskDialog"
import { PlusIcon } from "lucide-react"
import { useTranslations } from 'next-intl'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core"
import { 
  SortableContext, 
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { DroppableColumn } from "./ui/DroppableColumn"
import assigneesData from "@/data/assignees.json"
import { Assignee } from "@/types/assignee"
import { getColumns, createTask, updateTask, deleteTask, moveTask } from "@/app/actions/kanban"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define types based on our database schema
interface Column {
  id: string
  title: string
  order: number
  tasks: Task[]
}

interface Task {
  id: string
  title: string
  description: string | null
  columnId: string
  order: number
  assignee?: Assignee
  dueDate?: Date
}

export function KanbanBoard() {
  const t = useTranslations()
  
  const [columns, setColumns] = useState<Column[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const availableAssignees = assigneesData.assignees

  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnsData = await getColumns()
        setColumns(columnsData)
        
        // Flatten tasks from all columns
        const allTasks = columnsData.flatMap(col => col.tasks)
        setTasks(allTasks)
        
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )

  const handleCreateTask = async (values: any) => {
    try {
      // Find the first column to add the task to
      const firstColumn = columns[0]
      if (!firstColumn) return
      
      // Get the highest order in this column
      const maxOrder = tasks
        .filter(t => t.columnId === firstColumn.id)
        .reduce((max, task) => Math.max(max, task.order), -1)
      
      const newTaskData = {
        title: values.title,
        description: values.description || '',
        columnId: firstColumn.id,
        order: maxOrder + 1,
        assigneeId: values.assigneeId,
        dueDate: values.dueDate
      }
      
      const result = await createTask(newTaskData)
      
      // Optimistically update the UI
      if (result && result[0]) {
        const newTask = {
          ...result[0],
          assignee: values.assigneeId ? availableAssignees.find(a => a.id === values.assigneeId) : undefined
        }
        
        setTasks(prev => [...prev, newTask])
      }
      
      setDialogOpen(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleEditTask = async (values: any) => {
    if (!selectedTask) return
    
    try {
      const updatedData = {
        title: values.title,
        description: values.description || '',
        assigneeId: values.assigneeId,
        dueDate: values.dueDate
      }
      
      await updateTask(selectedTask.id, updatedData)
      
      // Optimistically update the UI
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === selectedTask.id
            ? {
                ...task,
                title: values.title,
                description: values.description || '',
                assignee: values.assigneeId ? availableAssignees.find(a => a.id === values.assigneeId) : undefined,
                dueDate: values.dueDate
              }
            : task
        )
      )
      
      setDialogOpen(false)
      setSelectedTask(undefined)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDeleteTask = async () => {
    if (!selectedTask) return
    
    try {
      await deleteTask(selectedTask.id)
      
      // Optimistically update the UI
      setTasks(currentTasks => currentTasks.filter(task => task.id !== selectedTask.id))
      
      setDialogOpen(false)
      setSelectedTask(undefined)
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const openCreateDialog = () => {
    setSelectedTask(undefined)
    setDialogOpen(true)
  }

  const openEditDialog = (task: Task) => {
    setSelectedTask(task)
    setDialogOpen(true)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return

    const activeTask = tasks.find(t => t.id === active.id)
    if (!activeTask) return

    const overTask = tasks.find(t => t.id === over.id)
    const overColumn = columns.find(c => c.id === over.id)

    try {
      if (overTask) {
        const activeIndex = tasks.findIndex(t => t.id === active.id)
        const overIndex = tasks.findIndex(t => t.id === over.id)

        // If dropping on a task in a different column
        if (activeTask.columnId !== overTask.columnId) {
          // Optimistically update UI
          setTasks(tasks => {
            const newTasks = [...tasks]
            const [movedTask] = newTasks.splice(activeIndex, 1)
            movedTask.columnId = overTask.columnId
            newTasks.splice(overIndex, 0, movedTask)
            return newTasks
          })
          
          // Update in database
          await moveTask(activeTask.id, overTask.columnId, overTask.order)
        } else {
          // Same column reorder - optimistically update UI
          setTasks(tasks => arrayMove(tasks, activeIndex, overIndex))
          
          // Update in database
          await moveTask(activeTask.id, activeTask.columnId, overTask.order)
        }
      } else if (overColumn) {
        // Dropping directly on a column
        // Get the highest order in this column
        const tasksInColumn = tasks.filter(t => t.columnId === overColumn.id)
        const maxOrder = tasksInColumn.length > 0
          ? Math.max(...tasksInColumn.map(t => t.order))
          : -1
        
        // Optimistically update UI
        setTasks(currentTasks =>
          currentTasks.map(task =>
            task.id === activeTask.id
              ? { ...task, columnId: overColumn.id }
              : task
          )
        )
        
        // Update in database
        await moveTask(activeTask.id, overColumn.id, maxOrder + 1)
      }
    } catch (error) {
      console.error("Failed to move task:", error)
      // Could add logic to revert the optimistic update here
    }

    setActiveId(null)
  }

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4">
        <div className="flex justify-end">
          <Button onClick={openCreateDialog}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('kanban.addJob')}
          </Button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 p-4 h-[calc(100vh-5rem)]">
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.columnId === column.id)
            return (
              <DroppableColumn
                key={column.id}
                id={column.id}
                title={column.title}
                className="flex-1 min-w-[300px]"
              >
                <SortableContext items={columnTasks.map(t => t.id)} strategy={rectSortingStrategy}>
                  <div className="flex flex-col gap-2">
                    {columnTasks.map((task) => (
                      <TaskCard 
                        key={task.id}
                        task={{
                          ...task,
                          description: task.description || '',
                          status: column.id as any
                        }}
                        isDroppable={true}
                        onClick={() => openEditDialog(task)}
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
                    ))}
                  </div>
                </SortableContext>
              </DroppableColumn>
            )
          })}
        </div>
        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={{
                ...activeTask,
                description: activeTask.description || '',
                status: columns.find(c => c.id === activeTask.columnId)?.id as any
              }}
              availableAssignees={availableAssignees}
              className="rotate-3"
            />
          )}
        </DragOverlay>
      </DndContext>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask ? {
          ...selectedTask,
          description: selectedTask.description || ''
        } : undefined}
        availableAssignees={availableAssignees}
        onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
        mode={selectedTask ? 'edit' : 'create'}
      />
      <Popover>
        <PopoverTrigger>Edit Task</PopoverTrigger>
        <PopoverContent task={selectedTask} />
      </Popover>
    </div>
  )
} 