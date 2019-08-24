import React, { Component } from "react";
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

class App extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            routerRef: React.createRef(),
            recents: [{}, {}, {}]
        };
    }
    componentDidMount() {
        this.state.routerRef.current.history.listen((location, action) => {
            console.log("route changed", location, action);
            if (action === "PUSH" && location.state) {
                let recents = this.state.recents;
                let found = false;
                // make sure this isn't already included first
                recents.forEach(recent => {
                    if (recent.text === location.state) {
                        found = true;
                    }
                });
                if (!found) {
                    let recent = {
                        text: location.state,
                        pathname: location.pathname
                    };
                    // move things around
                    recents[2] = recents[1];
                    recents[1] = recents[0];
                    recents[0] = recent;
                    this.setState({ recents: recents });
                }
            }
        });
    }
    render() {
        return (
            <Router ref={this.state.routerRef}>
                <React.Fragment>
                    <Navbar recents={this.state.recents} />
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/team/:id"
                        render={props => (
                            <Team key={props.match.params.id} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path="/player/:id"
                        render={props => (
                            <Player key={props.match.params.id} {...props} />
                        )}
                    />
                    <Footer />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;
