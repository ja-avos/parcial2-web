import React, { useEffect } from "react";
import * as d3 from "d3";
import useData from "./useData";
import { FormattedMessage } from "react-intl";

const Chart = () => {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 80, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top -margin.bottom;

    const [data] = useData();

    useEffect(() => { if(data) {
        const canvas = d3.select("#canvas");
        canvas.selectAll('*').remove();
        const svg = canvas.append("svg").attr("viewBox", [0, 0, width, height]);

        let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                data.reduce((prev, current) =>
                    prev.seasons > current.seasons ? prev : current
                ).seasons,
            ])
            .range([iheight, 0]);

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.name))
            .range([0, iwidth])
            .padding(0.1);
        const bars = g.selectAll("rect").data(data);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .style("fill", "orange")
            .attr("x", (d) => x(d.name))
            .attr("y", (d) => y(d.seasons))
            .attr("height", (d) => iheight - y(d.seasons))
            .attr("width", x.bandwidth());

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
    }});

    return (<div style={{width: 'fit-content', margin: 'auto'}}><h2 style={{margin: '20px'}}><FormattedMessage id='chart.title'/></h2><div id="canvas" style={{ height: "600px", width: "600px", marginLeft: "auto", marginRight: "auto"}}></div></div>);
};

export default Chart;
