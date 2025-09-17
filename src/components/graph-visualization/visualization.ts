import { Graph } from "@/types";
import cytoscape, { Core } from "cytoscape";
import { RefObject } from "react";

const generateVisualization = (graph: Graph, containerRef: RefObject<HTMLElement | null>): Core => {
    const cy = cytoscape({
        container: containerRef.current,
        elements: graph.elements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#ccc',
                    'font-size': '14px',
                    'font-weight': 'lighter',
                    'height': '50px',
                    'label': 'data(id)',
                    'text-valign': 'center',
                    'width': '50px'
                }
            },
            {
                selector: 'node:selected',
                style: {
                    'background-color': '#0000aa',
                    'color': '#fff'
                }
            },
            {
                selector: 'edge',
                style: {
                    'line-color': '#ccc',
                    'width': 3
                }
            },
            {
                selector: 'edge:selected',
                style: {
                    'line-color': '#0000af'
                }
            }
        ],
        layout: {
            name: 'random'
        }
    });

    return cy;
};

export { generateVisualization }