import React from "react";
import { Pie } from "@vx/shape";
import { Group } from "@vx/group";

const labelFill = "#000000";

const pieColors = [
    "#fff24d",
    "#df6363",
    "#63dfdf",
    "#ec00ff",
    "#ff8a33",
    "#b3f542",
    "#f542b3",
    "#11a0f3",
    "#f3112f"
];

const frequency = d => d.frequency;

export default ({ width, height, margin, idata, title }) => {
    const radius = Math.min(width, height) / 2;
    const centerY = height / 2;
    const centerX = width / 2;
    console.log("idata", idata);

    return (
        <svg width={width} height={height}>
            <rect rx={14} width={width} height={height} fill="#000" />
            <text
                style={{
                    fontSize: "3rem",
                    fill: "#fff",
                    textAnchor: "middle"
                }}
                x={width / 2}
                y={40}
                verticalanchor="start"
            >
                {title}
            </text>
            <Group top={centerY - margin.top + 20} left={centerX}>
                <Pie
                    data={idata}
                    pieValue={frequency}
                    pieSortValues={(a, b) => -1}
                    outerRadius={radius - 50}
                    innerRadius={100}
                    cornerRadius={0}
                >
                    {pie => {
                        return pie.arcs.map((arc, i) => {
                            let index =
                                i >= pieColors.length
                                    ? parseInt(
                                          Math.random() * pieColors.length - 1
                                      )
                                    : i;
                            const pieFill = pieColors[index];
                            const [centroidX, centroidY] = pie.path.centroid(
                                arc
                            );
                            return (
                                <g key={`letters-${arc.data.label}-${i}`}>
                                    <path
                                        d={pie.path(arc)}
                                        fill={pieFill}
                                        fillOpacity={1}
                                    />
                                    <text
                                        fill={labelFill}
                                        textAnchor="middle"
                                        x={centroidX}
                                        y={centroidY}
                                        dy=".33em"
                                        fontSize={"1.5rem"}
                                    >
                                        {arc.data.item} ({arc.data.frequency})
                                    </text>
                                </g>
                            );
                        });
                    }}
                </Pie>
            </Group>
        </svg>
    );
};
