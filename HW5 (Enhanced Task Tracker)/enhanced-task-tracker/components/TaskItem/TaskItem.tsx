import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  id: number;
  title: string;
  completed: boolean;
  priority?: 'High' | 'Medium' | 'Low';
}

const TaskItem = ({ id, title, completed, priority = 'Medium' }: IProps) => {
    
  const priorityStyles = {
    High: 'border-red-500',
    Medium: 'border-yellow-500',
    Low: 'border-green-500',
  };

  return (
    <div className={`p-4 mb-3 border-l-4 ${priorityStyles[priority]} bg-white rounded shadow`}>
      <Link href={`/task/${id}`} className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          <Image src={completed ? '/check.png' : '/clock.png'} alt={completed ? 'Completed' : 'Pending'} width={24} height={24} />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex mt-1">
            <span className={`px-2 py-1 text-xs rounded ${completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {completed ? 'Completed' : 'Pending'}
            </span>
            <span className="ml-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
              Priority: {priority}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TaskItem;