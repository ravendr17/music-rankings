export default function App() {
  const sidebarBtn = "bg-gray-100 py-4 cursor-pointer " +
    "hover:bg-gray-200 active:bg-gray-300";

  return (
    <div className="min-h-screen flex">
      <div className="w-50 bg-gray-100 flex flex-col">
        <div className="font-bold text-center py-6 text-lg mb-4">
          Music Rankings
        </div>

        <button className={sidebarBtn}>Add New Songs</button>
        <button className={sidebarBtn}>All-Time</button>
        <button className={sidebarBtn}>Annual</button>
        <button className={sidebarBtn}>Monthly</button>

      </div>

    </div>
  );
}
