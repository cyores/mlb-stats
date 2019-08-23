import React, { Component } from "react";
import styled from "styled-components";

const StyledHero = styled.div`
    width: 100%;
    max-height: 33vh;
    background: #000;
    color: #ddd;
    margin-bottom: 2.5rem;
    padding: 2rem 0;
`;

class Hero extends Component {
    state = {};

    render() {
        return (
            <StyledHero>
                <div className="row text-center">
                    <div className="four columns">
                        <img
                            style={{ maxHeight: "33vh" }}
                            src={this.props.leftImagesrc}
                        />
                    </div>
                    <div className="four columns">
                        <h1>
                            {this.props.title} {this.props.shortTitle}
                        </h1>
                        <h4>{this.props.subtitle}</h4>
                        {this.props.children}
                    </div>
                    <div className="four columns">
                        <img
                            style={{ maxHeight: "33vh" }}
                            src={this.props.rightImagesrc}
                        />
                    </div>
                </div>
            </StyledHero>
        );
    }
}

export default Hero;
