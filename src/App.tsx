import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import AddCitizen from "./pages/AddCitizen";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='add-citizen' element={<AddCitizen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
