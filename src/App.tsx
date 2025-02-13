import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Edition from "./pages/Edition";
import EditionPhoto from "./pages/EditionPhoto";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edition" element={<Edition />} />
        <Route path="/editionPhoto" element={<EditionPhoto />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;