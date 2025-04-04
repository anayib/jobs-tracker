import { KanbanBoard } from "./components/KanbanBoard"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Kanban Task Manager</h1>
          <p className="text-muted-foreground">Manage your tasks efficiently</p>
        </div>
        <ThemeToggle />
      </div>
      <KanbanBoard />
    </main>
  )
}