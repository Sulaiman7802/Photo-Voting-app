import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Upload } from "./Upload";
import { Nav } from "./Nav";
import { Hero } from "./Hero";

export const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;
