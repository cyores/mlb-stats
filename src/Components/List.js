import React, { Component } from "react";
import styled from "styled-components";

const StyledList = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0.1rem;
`;

class List extends Component {
    state = {};

    render() {
        return <StyledList>{this.props.children}</StyledList>;
    }
}

export default List;
