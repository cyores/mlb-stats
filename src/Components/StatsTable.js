import React, { Component } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
    width: 100%;
`;

class StatsTable extends Component {
    render() {
        // Keys and headings are optional. If not provided,
        // the given data will simply loop through and display
        // all keys with their headings as is
        const { splits, keys, headings } = this.props;

        return (
            <StyledTable>
                <table className="u-full-width">
                    <thead>
                        <tr>
                            {headings
                                ? headings.map((heading, index) => (
                                      <th key={`td-${heading}-${index}`}>
                                          {heading}
                                      </th>
                                  ))
                                : Object.keys(splits[0].stat).map(
                                      (key, index) => (
                                          <th key={`td-${key}-${index}`}>
                                              {key}
                                          </th>
                                      )
                                  )}
                        </tr>
                    </thead>
                    <tbody>
                        {splits.map((year, index) => (
                            <tr key={index}>
                                <td>{year.season}</td>
                                {year.team ? <td>{year.team.name}</td> : <td />}
                                {keys
                                    ? keys.map(key =>
                                          typeof year.stat[key] === "object" ? (
                                              <td key={`td-${key}-${index}`}>
                                                  {year.stat[key].name}
                                              </td>
                                          ) : (
                                              <td key={`td-${key}-${index}`}>
                                                  {year.stat[key]}
                                              </td>
                                          )
                                      )
                                    : Object.keys(splits[0].stat).map(key =>
                                          typeof year.stat[key] === "object" ? (
                                              <td key={`td-${key}-${index}`}>
                                                  {year.stat[key].name}
                                              </td>
                                          ) : (
                                              <td key={`td-${key}-${index}`}>
                                                  {year.stat[key]}
                                              </td>
                                          )
                                      )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </StyledTable>
        );
    }
}

export default StatsTable;
