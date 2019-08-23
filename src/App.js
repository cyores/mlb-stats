import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Team from "./pages/Team";
import Player from "./pages/Player";

// components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
    return (
        <Router>
            <React.Fragment>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/team" component={Team} />
                <Route exact path="/team/:id" component={Team} />
                <Route exact path="/player" component={Player} />
                <Route exact path="/player/:id" component={Player} />
                <Footer />
            </React.Fragment>
        </Router>
    );
}

export default App;
