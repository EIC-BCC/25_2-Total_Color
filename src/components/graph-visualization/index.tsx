import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { WritingText } from "../ui/shadcn-io/writing-text";
import { assignColorNumber, generateVisualization } from "./visualization";
import { useGraph } from "@/contexts/GraphContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function GraphVisualization() {
    const { graph } = useGraph();
    const cyContainerRef = useRef<HTMLElement | null>(null);
    const [colors, setColors] = useState<Map<string, number>>(new Map());
    const colorsList = Array.from(colors.keys());

    const updateColor = (previousColor: string, currentColor: string) => {
        setColors((prev) => {
            const newColors = new Map(prev);
            let qtd: number | undefined;
    
            qtd = newColors.get(previousColor);
            if (qtd) {
                if (qtd > 1) {
                    newColors.set(previousColor, qtd - 1);
                } else {
                    newColors.delete(previousColor);
                }
            }

            if (currentColor) {
                qtd = newColors.get(currentColor);
                if (qtd) {
                    newColors.set(currentColor, qtd + 1);
                } else {
                    newColors.set(currentColor, 1);
                }
            }


            return newColors;
        });
    }

    useEffect(() => {
        const cy = generateVisualization(graph, cyContainerRef);

        if (cy) {
            setColors(new Map());
            cy.elements().on('select', (e) => assignColorNumber(e, updateColor));
        }
    }, [graph.renderings]);


    return (
        <>
            {
                Boolean(graph.matrix) ||
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

            <Collapsible
                className="absolute bg-white bottom-5 left-5 p-2 rounded-md z-10"
                defaultOpen
            >
                <CollapsibleTrigger>
                    <div className="font-bold p-2">
                        Painel de Coloração Total
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="border-t-2 border-t-gray-500 flex flex-col gap-2 pt-2">
                        <div className="flex gap-2">
                            <span>Número cromático total:</span>
                        </div>

                        <div className="flex gap-2">
                            <span>Coloração:</span>
                        </div>

                        <div className="flex gap-2">
                            <span>Cores utilizadas:</span>
                            <span>
                                {colorsList.map((color, index) => (
                                    <span key={color} className="pr-1">
                                        {index != 0 && '/ '}
                                        {color}
                                    </span>
                                ))}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span>Situação:</span>
                            <span>
                                {colorsList.length > 0 && `${colorsList.length}-coloração-total`}
                            </span>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </>
    );
}