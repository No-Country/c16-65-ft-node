import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ContextProvider } from "./context/Context";

function App() {
  return (
    <ContextProvider>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </ContextProvider>
  );
}

export default App;



