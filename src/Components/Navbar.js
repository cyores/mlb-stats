import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNavbar = styled.nav`
    background: #000;
    padding: 2rem;
`;

const NavbarItem = styled.div`
    display: inline;
    padding: 2rem;

    & > * {
        text-decoration: none;
        color: #fff;
        font-size: 1.75rem;
    }
    & > *:hover {
        color: #ddd;
    }

    transition: 0.1s all ease-in-out;
`;

const RecentsWrapper = styled.span`
    @media (max-width: 768px) {
        display: none;
    }
`;

class Navbar extends Component {
    state = {};

    render() {
        return (
            <StyledNavbar>
                <div className="container">
                    <NavbarItem style={{ borderRight: "2px solid white" }}>
                        <Link to="/">Home</Link>
                    </NavbarItem>
                    <RecentsWrapper>
                        <div
                            style={{
                                display: "inline",
                                color: "#fff",
                                padding: "2rem"
                            }}
                        >
                            <span style={{ fontSize: "2.5rem" }}>&#8250;</span>
                        </div>
                        {this.props.recents.map((recent, index) =>
                            recent ? (
                                <NavbarItem key={index}>
                                    <Link
                                        to={{
                                            pathname: recent.pathname,
                                            state: recent.text
                                        }}
                                    >
                                        {recent.text}
                                    </Link>
                                </NavbarItem>
                            ) : null
                        )}
                    </RecentsWrapper>
                </div>
            </StyledNavbar>
        );
    }
}

export default Navbar;
