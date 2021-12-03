import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/Listreviews";
import Detail from "./components/ReviewDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Detail />} />
        <Route path="/edit/:reviewId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
