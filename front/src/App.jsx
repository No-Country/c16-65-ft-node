import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ComicsPage from "./pages/Categorias.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import Detail from "./pages/Detail.jsx";
import Search from './pages/Search.jsx'
import Notfound from './pages/Notfound.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ComicsPage/>}/>
        <Route path="/2" element={<CarritoPage/>}/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<Notfound/>}/>

      </Routes>
    </div>
  );
}

export default App;
