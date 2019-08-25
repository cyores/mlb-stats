import React from "react";
import { Bar, Line } from "@vx/shape";
import { Group } from "@vx/group";
import { Grid } from "@vx/grid";
import { scaleBand, scaleLinear } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";

const barColors = [
    "#63dfdf",
    "#ff8a33",
    "#df6363",
    "#b3f542",
    "#f542b3",
    "#fff24d",
    "#11a0f3",
    "#ec00ff",
    "#f3112f"
];

// responsive utils for axis ticks
function numTicksForHeight(height) {
    if (height <= 300) return 3;
    if (300 < height && height <= 600) return 5;
    return 10;
}

function numTicksForWidth(width) {
    if (width <= 300) return 2;
    if (300 < width && width <= 400) return 5;
    return 10;
}

// accessors
const x = d => d.x;
const y = d => d.y;

export default ({
    width,
    height,
    margin,
    idata,
    title,
    leftLabel,
    bottomLabel
}) => {
    const data = idata;
    // bounds
    const xMax = width - margin.left * 2;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: data.map(x),
        padding: 0.4
    });
    const yScale = scaleLinear({
        rangeRound: [yMax, 0],
        domain: [0, Math.max(...data.map(y))]
    });

    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} fill={"#000"} rx={14} />
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
            <Grid
                xScale={xScale}
                yScale={yScale}
                width={xMax}
                height={yMax}
                top={margin.top}
                left={margin.left}
                numTicksRows={numTicksForHeight(height)}
                numTicksColumns={numTicksForWidth(width)}
            />
            <Group top={margin.top} left={margin.left}>
                {data.map((d, i) => {
                    let index =
                        i >= barColors.length
                            ? parseInt(Math.random() * barColors.length - 1)
                            : i;
                    const barFill = barColors[index];
                    const xdata = x(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - yScale(y(d));
                    const barX = xScale(xdata);
                    const barY = yMax - barHeight;
                    return (
                        <Bar
                            key={`bar-${xdata}-${i}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={barFill}
                            // onClick={event => {
                            //     alert(
                            //         `clicked: ${JSON.stringify(
                            //             Object.values(d)
                            //         )}`
                            //     );
                            // }}
                        />
                    );
                })}
            </Group>
            <Group left={margin.left}>
                <AxisLeft
                    top={margin.top}
                    left={0}
                    scale={yScale}
                    hideZero
                    numTicks={numTicksForHeight(height)}
                    label={leftLabel}
                    labelProps={{
                        fill: "#fff",
                        textAnchor: "middle",
                        fontSize: "2rem",
                        fontFamily: "Raleway"
                    }}
                    stroke="#fff"
                    tickStroke="#fff"
                    tickLabelProps={(value, index) => ({
                        fill: "#fff",
                        textAnchor: "end",
                        fontSize: "1rem",
                        fontFamily: "Raleway",
                        dx: "-0.25em",
                        dy: "0.25em"
                    })}
                    tickComponent={({ formattedValue, ...tickProps }) => (
                        <text {...tickProps}>{formattedValue}</text>
                    )}
                />
                <AxisBottom
                    top={height - margin.bottom}
                    left={0}
                    scale={xScale}
                    numTicks={numTicksForWidth(width)}
                    label={bottomLabel}
                >
                    {axis => {
                        const tickLabelSize = 10;
                        const tickRotate = 45;
                        const tickColor = "#fff";
                        const axisCenter =
                            (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
                        return (
                            <g className="my-custom-bottom-axis">
                                {axis.ticks.map((tick, i) => {
                                    const tickX = tick.to.x;
                                    const tickY =
                                        tick.to.y +
                                        tickLabelSize +
                                        axis.tickLength;
                                    return (
                                        <Group
                                            key={`vx-tick-${tick.value}-${i}`}
                                            className={"vx-axis-tick"}
                                        >
                                            <Line
                                                from={tick.from}
                                                to={tick.to}
                                                stroke={tickColor}
                                            />
                                            <text
                                                transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                                                fontSize={tickLabelSize}
                                                textAnchor="middle"
                                                fill={tickColor}
                                            >
                                                {tick.formattedValue}
                                            </text>
                                        </Group>
                                    );
                                })}
                                <text
                                    textAnchor="middle"
                                    transform={`translate(${axisCenter}, 50)`}
                                    fontSize="2rem"
                                    fill="#fff"
                                >
                                    {axis.label}
                                </text>
                            </g>
                        );
                    }}
                </AxisBottom>
            </Group>
        </svg>
    );
};
