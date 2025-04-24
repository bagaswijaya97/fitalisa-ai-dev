import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestingPage from "./pages/test/TestingPage";
import TestPage from "./pages/test/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
