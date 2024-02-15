import "./App.css";
import CardList from "./components/CardList";
import NavBar from "./components/NavBar.jsx";
import ComicsPage from './pages/Categorias.jsx'

function App() {
  return (
    <div>
      <NavBar />
      <div >
        {/* <CardList clasNa /> */}
        <ComicsPage/>
      </div>
    </div>
  );
}

export default App;
