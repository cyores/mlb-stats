import React, { Component } from "react";
import styled from "styled-components";

const StyledStatContainer = styled.div`
    margin: 2rem;
    text-transform: capitalize;
    & > div > .toverflow {
        overflow-x: scroll;
    }
    @media (max-width: 1024px) {
        & > div > .toverflow {
            overflow-x: scroll;
            padding: 0 3rem;
        }
    }
`;

class StatContainer extends Component {
    render() {
        return (
            <StyledStatContainer>
                <div className="row">
                    <div className="two columns">
                        <div style={{}}>
                            <h3>{this.props.statType}</h3>
                        </div>
                    </div>
                    <div className="ten columns toverflow">
                        <div>{this.props.children}</div>
                    </div>
                </div>
            </StyledStatContainer>
        );
    }
}
export default StatContainer;
