import TaskItem from "@/components/TaskItem/TaskItem";

const assignPriority = (id: number): 'High' | 'Medium' | 'Low' => {
  const priorities: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
  return priorities[id % 3];
  //this will give priority based on id, high, medium, low
};

// Fetch tasks from JSONPlaceholder API
async function getTasks() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
      next: { revalidate: 3600 }, 
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}


export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Task Tracker</h1>
      
      <div className="space-y-4">
        {tasks.map((task: { id: number; title: string; completed: boolean }) => (
          <TaskItem 
            key={task.id} 
            id={task.id} 
            title={task.title} 
            completed={task.completed}
            priority={assignPriority(task.id)} 
          />
        ))}
      </div>
    </div>
  );
}