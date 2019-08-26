import React, { Component } from "react";
import styled from "styled-components";

const StyledList = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0.1rem;
    @media (max-width: 768px) {
        & > * {
            width: 100%;
            margin-bottom: 2rem !important;
        }
    }
`;

class List extends Component {
    state = {};

    render() {
        return <StyledList>{this.props.children}</StyledList>;
    }
}

export default List;
