import { connectWithdb } from "../helper/dbConnection";
import Link from 'next/link';

const Page = () => {

  connectWithdb();

  return (
    <div className="flex flex-col min-h-[80vh]">
      
      {/* Hero Section */}
      <main className="flex-grow p-8">
        <section className="text-center my-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Your To-Do Task Manager</h2>
          <p className="text-lg">Easily manage and track your tasks.</p>
        </section>

        {/* Subsections */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center mt-12 text-black">
          {/* Add Task Section */}
          <Link href="/addtask">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">Add a New Task</h3>
              <p className="mb-4">Create a new task to stay organized.</p>
              <span className="text-blue-600 font-semibold">Go to Add Task</span>
            </div>
          </Link>

          {/* Show Tasks Section */}
          <Link href="/showtasks">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">View All Tasks</h3>
              <p className="mb-4">Check your existing tasks and mark them as done.</p>
              <span className="text-blue-600 font-semibold">Go to All Tasks</span>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Page;
