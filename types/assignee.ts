export interface Assignee {
  id: string
  name: string
  image?: string
}

export type AssigneesData = {
  assignees: Assignee[]
} 