import { KanbanBoard } from "@/components/KanbanBoard"
import { Navbar } from "@/components/ui/Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-35">
        <div className="flex justify-between items-center mb-1" />
        <KanbanBoard />
      </main>
    </>
  )
}