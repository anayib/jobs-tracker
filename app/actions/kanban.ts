'use server'

import { columnService, taskService } from '@/db/services'
import { revalidatePath } from 'next/cache'

export async function getColumns() {
  return await columnService.getAll()
}

export async function createTask(data: {
  title: string
  description?: string
  columnId: string
  order: number
  assigneeId?: string
  dueDate?: Date
}) {
  const result = await taskService.create({
    title: data.title,
    description: data.description,
    columnId: data.columnId,
    order: data.order,
  })
  
  revalidatePath('/')
  return result
}

export async function updateTask(
  id: string,
  data: {
    title?: string
    description?: string
    columnId?: string
    order?: number
    assigneeId?: string
    dueDate?: Date
  }
) {
  const result = await taskService.update(id, {
    title: data.title,
    description: data.description,
    columnId: data.columnId,
    order: data.order,
  })
  
  revalidatePath('/')
  return result
}

export async function deleteTask(id: string) {
  const result = await taskService.delete(id)
  revalidatePath('/')
  return result
}

export async function moveTask(id: string, columnId: string, order: number) {
  const result = await taskService.update(id, { columnId, order })
  revalidatePath('/')
  return result
} 