import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import ComicsPage from './pages/Categorias.jsx'
import CarritoPage from './pages/CarritoPage.jsx';

function App() {
  return (
    <div>
      <NavBar />
      <div >

        <ComicsPage/>




      </div>
    </div>
  );
}

export default App;
