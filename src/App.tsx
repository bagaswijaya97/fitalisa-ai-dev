import "./App.css";
import Aaa from "./pages/aaa/Aaa";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import New from "./pages/new/New";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Aaa />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
