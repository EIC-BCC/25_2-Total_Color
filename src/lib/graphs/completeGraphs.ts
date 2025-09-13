import { ElementsDefinition } from "cytoscape";

const elements: ElementsDefinition = {
    nodes: [],
    edges: []
};

const getCompleteGraph = (order: number): ElementsDefinition => {
    for (let i = 1; i <= order; i++) {
        elements.nodes.push({
            data: { id: `v${i}` }
        });

        for (let j = i + 1; j <= order; j++) {
            elements.edges.push({
                data: { id: `v${i}v${j}`, source: `v${i}`, target: `v${j}` }
            });
        }
    }
    
    return elements;
};

export { getCompleteGraph }