import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputStyle = "border p-1.5 w-full bg-white rounded-md";

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="bg-gray-200 w-100 h-100 rounded-md p-5 flex flex-col gap-6">
        <div className="text-center font-bold text-xl">
          Music Rankings
        </div>

        <input 
          type="text"
          placeholder="Username"
          className={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          className={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="border px-8 py-2 cursor-pointer rounded-md text-white
            bg-green-600 hover:bg-green-500 active:bg-green-400 w-full"
        >
          Login
        </button>

        <button
          className="border px-8 py-2 cursor-pointer rounded-md text-white
          bg-blue-600 hover:bg-blue-500 active:bg-blue-400 w-full"
        >
          Create new account
        </button>

        <div className="mt-auto text-center">
          By ravendr17, 2026
        </div>
      </div>
    </div>
  );
}