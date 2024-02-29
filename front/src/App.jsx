import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ContextProvider } from "./context/Context";
import "./App.css";

function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="main-content">
          <NavBar />
          <AppRoutes />
        </div>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
