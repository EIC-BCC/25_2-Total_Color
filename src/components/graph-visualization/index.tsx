import { useWindowSize } from "@/hooks/use-window-size";
import { generateElements, getCompleteGraph } from "@/lib/graphs";
import { Graph } from "@/types";
import cytoscape, { Core, ElementsDefinition } from "cytoscape";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { WritingText } from "../ui/shadcn-io/writing-text";
import { generateVisualization } from "./visualization";

interface GraphVisualizationProps {
    graph: Graph,
    setGraph: Dispatch<SetStateAction<Graph>>
}

export default function GraphVisualization({
    graph,
    setGraph
}: GraphVisualizationProps) {
    const cyContainerRef = useRef<HTMLElement | null>(null);
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    let cy: Core;

    useEffect(() => {
        const elements = generateElements(graph);
        
        if (elements) {
            console.log('geração dos elementos pela matriz');
            setGraph(prev => ({
                ...prev,
                elements
            }));
        }

    }, [graph.matrix]);

    useEffect(() => {
        if (graph.elements) {
            console.log('geração da visualização pelos elementos');
            cy = generateVisualization(graph, cyContainerRef);
        }
    }, [graph.elements, windowWidth, windowHeight]);

    return (
        <>
            {
                Boolean(graph.elements) ||
                <section
                    className="flex h-full items-center justify-center p-4 w-full"
                >
                    <WritingText
                        text="Bem-vindo(a) ao Total-Color 😎"
                        className="text-4xl text-white select-none"
                        inView={true}
                        spacing=".5rem"
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 2,
                            delay: 0.2
                        }}
                    />
                </section>                    
            }
            <motion.section
                ref={cyContainerRef}
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: .7 }}
            />
        </>
    );
}