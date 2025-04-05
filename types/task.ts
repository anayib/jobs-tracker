import { Assignee } from "./assignee";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  columnId: string;
  order: number;
  assignee?: Assignee;
  dueDate?: Date;
} 