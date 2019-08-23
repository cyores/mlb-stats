import React, { Component } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
    background: #000;
    padding: 2rem;
    min-height: 25vh;
    margin-top: 10vh;
    color: #fff;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
`;

class Footer extends Component {
    state = {};

    render() {
        return (
            <StyledFooter>
                <div className="container">
                    <h6>Made by Christian Yores &copy;</h6>
                    <a
                        style={{ margin: "0 2rem" }}
                        target="new"
                        href="https://github.com/cyores"
                    >
                        Github
                    </a>
                    <a
                        style={{ margin: "0 2rem" }}
                        target="new"
                        href="https://cyores.github.io"
                    >
                        Personal Site
                    </a>
                    <a
                        style={{ margin: "0 2rem" }}
                        target="new"
                        href="https://linkedin.com/in/christianyores"
                    >
                        LinkedIn
                    </a>
                    <a
                        style={{ margin: "0 2rem" }}
                        target="new"
                        href="https://github.com/cyores/mlb-stats"
                    >
                        Project Repository
                    </a>
                </div>
            </StyledFooter>
        );
    }
}

export default Footer;
