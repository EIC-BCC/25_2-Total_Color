import { DownloadIcon, LoaderCircleIcon, PaletteIcon, PlusIcon, PyramidIcon } from "lucide-react";
import { motion } from "motion/react";
import GraphGenerator from "../graph-generator";
import { useGraph } from "@/contexts/GraphContext";
import { useEffect, useState } from "react";
import { matrixToGraph6 } from "@/lib/graphs";

export default function FabBar() {
    const { graph, updateGraph } = useGraph();
    const [graph6File, setGraph6File] = useState<Blob>();

    useEffect(() => {
        if (graph.matrix) {
            const blob = new Blob([matrixToGraph6(graph.matrix)]);
            setGraph6File(blob);
        }
    }, [graph.renderings]);

    return (
        <>
            {
                graph.matrix &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="border border-gray-200 bg-white bottom-8 cursor-pointer fixed flex gap-2 hover:opacity-60 left-8 p-2 rounded duration-300 w-fit z-10"
                >
                    <div className="flex">
                        {graph6File ? <DownloadIcon /> : <LoaderCircleIcon className="animate-spin" />}
                    </div>
                    <a
                        download={`${graph.fileName}.g6`}
                        href={graph6File ? URL.createObjectURL(graph6File) : ''}
                    >
                        Baixar em graph6
                    </a>
                </motion.div>
            }
            
            {
                graph.matrix && graph.class &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="border border-gray-200 bg-white bottom-24 cursor-pointer fixed flex gap-2 hover:opacity-60 left-8 p-2 rounded duration-300 w-fit z-10"
                    onClick={() => updateGraph({ showColoring: true })}
                >
                    <div className="flex">
                        <PaletteIcon />
                    </div>

                    Apresentar Coloração
                </motion.div>
            }
        
            <GraphGenerator>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                    className="border border-gray-200 bg-white bottom-8 cursor-pointer fixed flex gap-2 hover:opacity-60 p-2 right-8 rounded duration-300 z-10"
                >
                    <div className="flex">
                        <PyramidIcon />
                        <PlusIcon size={15} />
                    </div>

                    Criar grafo
                </motion.div>
            </GraphGenerator>
        </>
    );
}