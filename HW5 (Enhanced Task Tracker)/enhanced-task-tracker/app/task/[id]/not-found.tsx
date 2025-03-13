import Link from 'next/link';
import Image from 'next/image';

export default function TaskNotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Task Not Found</h2>
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24">
            <Image 
              src="/x.png" 
              alt="Not Found" 
              width={96}
              height={96}
            />
          </div>
        </div>
        <p className="mb-6 text-gray-600">
          Sorry, the task you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}