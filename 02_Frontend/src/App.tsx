import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
