export default function App() {

  return (
    <div className="min-h-screen flex">

      <aside className="w-55 shrink-0 bg-gray-200 p-4 
        flex flex-col items-center"
      >
        <h1 className="font-bold text-xl mb-10">Music Rankings</h1>

        <nav className="flex flex-col w-full gap-6">

          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
              rounded-sm hover:bg-blue-700 active:bg-blue-600"
          >
            Add New
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
          >
            All-Time
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
          >
            Annual
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
          >
            Monthly
          </button>

        </nav>
        
      </aside>

      <main className="flex-1">

      </main>

    </div>
  );
}
