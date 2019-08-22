import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNavbar = styled.nav`
    background: #1EAEDB;
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
`;

class Navbar extends Component {
    state = {};

    render() {
        return (
            <StyledNavbar>
                <div className="container">
                    <NavbarItem>
                        <Link to="/">Home</Link>
                    </NavbarItem>
                </div>
            </StyledNavbar>
        );
    }
}

export default Navbar;
