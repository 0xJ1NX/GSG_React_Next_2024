import Link from 'next/link';

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Tasks
      </Link>
      
      <div className="p-6 border-l-4 border-gray-300 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            </div>
            
            <div className="flex justify-center items-center">
              <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          
          <div className="w-48 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}