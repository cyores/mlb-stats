import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCard = styled.div`
    position: relative;
    padding: 2rem;
    margin-bottom: 3rem;
    background: #fff;
    border-radius: 1rem;
    width: 190px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const StyledImg = styled.img`
    height: 95px;
    width: auto;
    margin: 2rem;
    margin-top: 1rem;
`;

const StyledFooter = styled.div`
    position: absolute;
    bottom: 1rem;
    width: 190px;
`;

class Card extends Component {
    state = {};

    render() {
        return (
            <StyledCard>
                <div className="row">
                    <div className="column text-center">
                        <StyledImg src={this.props.imagesrc} />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <h5 style={{ marginBottom: 0 }}>{this.props.title}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="column">{this.props.children}</div>
                </div>

                <br />

                <StyledFooter>
                    <Link
                        className="button u-full-width"
                        to={{
                            pathname: this.props.link,
                            state: this.props.title
                        }}
                    >
                        {this.props.linkText}
                    </Link>
                </StyledFooter>
            </StyledCard>
        );
    }
}

export default Card;
