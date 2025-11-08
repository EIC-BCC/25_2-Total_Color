import { Graph } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type GraphContextType = {
    graph: Graph,
    generateGraph: (newValues: Partial<Graph>) => void,
    updateGraph: (newValues: Partial<Graph>) => void
}

const GraphContext = createContext<GraphContextType | null>(null);

export function GraphProvider({
    children
}: { children: ReactNode }) {
    const [graph, setGraph] = useState<Graph>({ renderings: 0 });

    const generateGraph = (newValues: Partial<Graph>) => {
        setGraph((prev) => ({
            ...newValues,
            renderings: prev.renderings + 1
        }));
    };

    const updateGraph = (newValues: Partial<Graph>) => {
        setGraph((prev) => ({
            ...prev,
            ...newValues
        }));
    };

    return (
        <GraphContext.Provider value={{ graph, generateGraph, updateGraph }}>
            {children}
        </GraphContext.Provider>
    );
}

export function useGraph() {
    const context = useContext(GraphContext);

    if (!context) {
        throw new Error('useGraph deve ser utilizado em um <GraphProvider>');
    }

    return context;
}