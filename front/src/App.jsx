// App.jsx
import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ContextProvider } from "./context/Context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51OpHNsEK8KljwIogktpC8S5E3yFdAeMRCEpfFz7tFFII2DkmXF4P2levpNDuCkAf98JEvKBGq9axLh9npk67fBT600pDXU35KU"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <ContextProvider>
        <Router>
          <div className="main-content">
            <NavBar />
            <AppRoutes />
          </div>
          <Footer />
        </Router>
      </ContextProvider>
    </Elements>
  );
}

export default App;
