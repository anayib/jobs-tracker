import { Assignee } from "./assignee"

export interface Task {
  id: string
  title: string
  description: string
  status: 'opportunities' | 'applied' | 'interviewing' | 'closed'
  assignee?: Assignee
  dueDate?: Date
} 