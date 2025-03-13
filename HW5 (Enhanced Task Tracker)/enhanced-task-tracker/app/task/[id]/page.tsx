'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Mock priority assignment function
const assignPriority = (id: number): 'High' | 'Medium' | 'Low' => {
  const priorities: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
  return priorities[id % 3];
};

export default function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const taskId = resolvedParams.id;
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // This function is called during initial render
  // and helps Next.js detect the not-found case
  const checkTaskExists = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
      
      if (res.status === 404) {
        notFound();
      }
      
      return true;
    } catch {
      return false;
    }
  };

  // Call this during the initial render
  checkTaskExists();

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch task');
        }
        
        const data = await res.json();
        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [taskId]);

  const copyToClipboard = () => {
    if (task) {
      navigator.clipboard.writeText(task.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse flex flex-col items-center">
            <div className="text-xl text-gray-500 mb-4">Loading task details...</div>
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error.message}</p>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Tasks
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="text-xl text-gray-500">No task data available.</div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const priority = assignPriority(task.id);
  const statusText = task.completed ? 'Completed' : 'Pending';
  const iconSrc = task.completed ? '/check.png' : '/clock.png';

  // Determine style based on priority
  const priorityStyles = {
    High: 'border-red-500 bg-red-50',
    Medium: 'border-yellow-500 bg-yellow-50',
    Low: 'border-green-500 bg-green-50',
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Tasks
      </Link>

      <div className={`p-6 border-l-4 ${priorityStyles[priority]} rounded-lg shadow-md`}>
        <div className="flex items-center mb-4">
          <Image 
            src={iconSrc} 
            alt={statusText} 
            width={32} 
            height={32} 
            className="mr-3"
          />
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Task Details</h2>
            <p className="mb-2"><span className="font-medium">ID:</span> {task.id}</p>
            <p className="mb-2"><span className="font-medium">User ID:</span> {task.userId}</p>
            <p className="mb-2"><span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 text-sm rounded ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {statusText}
              </span>
            </p>
            <p className="mb-2"><span className="font-medium">Priority:</span> 
              <span className={`ml-2 px-2 py-1 text-sm rounded bg-gray-100`}>
                {priority}
              </span>
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Image 
              src="/details.png" 
              alt="Task illustration" 
              width={200} 
              height={150} 
              className="rounded-lg shadow"
            />
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
        >
          {copied ? 'Copied to clipboard!' : 'Copy Title to Clipboard'}
        </button>
      </div>
    </div>
  );
}