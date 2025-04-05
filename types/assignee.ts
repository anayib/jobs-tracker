export interface Assignee {
  id: string
  name: string
  image?: string
  // Add other fields as needed
}

export type AssigneesData = {
  assignees: Assignee[]
} 