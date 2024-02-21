import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import ComicsPage from './pages/Categorias.jsx'
import CarritoPage from './pages/CarritoPage.jsx';
import ComicDetail from "./components/ComicDetail.jsx"

function App() {
  return (
    <>
      <NavBar />
    <Routes>
        <Route path="/" element={<ComicsPage/>}/>
        <Route path="/comic-detail/:comicId" element={<ComicDetail/>}/>
    </Routes>
    </>
  );
}

export default App;
