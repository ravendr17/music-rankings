import {Route, Routes} from "react-router";
import Login from "./components/login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Music Rankings</div>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
