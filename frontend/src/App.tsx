import {Route, Routes} from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Music Rankings</div>} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}
