import React, { FormEventHandler, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { useGraph } from "@/contexts/GraphContext";
import { layouts } from ".";
import GraphFactory from "@/lib/graphs/GraphFactory";
import { GraphClassName } from "@/types";
import { Button } from "../ui/button";

interface ClassGraphGeneratorProps {
    closeDialog: () => void
}

export default function ClassGraphGenerator({
    closeDialog
}: ClassGraphGeneratorProps) {
    const { initGraph } = useGraph();
    const [graphClassName, setGraphClassName] = useState<GraphClassName | "">("");
    const [order, setOrder] = useState(3);
    const [layout, setLayout] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (graphClassName) {
            const graph = GraphFactory.make({
                graphClass: {
                    name: graphClassName,
                    order: order ? Number(order) : 1
                }
            });

            initGraph(graph, {
                layout,
                name: `${graphClassName}-${order}`,
                active: true,
                actionMode: "view",
                displayedColoring: new Map(),
            });
        }

        closeDialog();
    };

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <section className="flex flex-col gap-2">
                <h2 className="font-semibold">
                    Selecione uma classe
                </h2>

                <Select
                    value={graphClassName}
                    onValueChange={(value: GraphClassName) => {
                        setGraphClassName(value);
                        setLayout(value === 'paths' ? 'grid' : 'circle');
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paths">Caminhos</SelectItem>
                        <SelectItem value="cycles">Ciclos</SelectItem>
                        <SelectItem value="completes">Completos</SelectItem>
                    </SelectContent>
                </Select>
            </section>
            
            {graphClassName && (
                <>
                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">
                            Quantidade de vértices
                        </h2>

                        <Input
                            type="number"
                            id="order"
                            name="order"
                            min={graphClassName === 'cycles' ? 3 : 1}
                            value={order}
                            step={1}
                            required
                            onChange={(e) => {
                                setOrder(Number.parseInt(e.target.value));
                            }}
                            onWheel={(e) => {
                                setOrder((prev) => {
                                    const next = prev - (e.deltaY > 0 ? 1 : -1);
                                    const newValue = Math.max(next, graphClassName === 'cycles' ? 3 : 1);
                                    return newValue;
                                });
                            }}
                        />
                    </section>

                    <section className="flex flex-col gap-2">
                        <h2 className="font-semibold">
                            Layout
                        </h2>

                        <div className="flex gap-4">
                            <Select value={layout} onValueChange={setLayout}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {layouts.map((layout) => (
                                        <SelectItem key={layout.value} value={layout.value}>
                                            {layout.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </section>

                    <Button className="bg-blue-500 cursor-pointer hover:bg-blue-500">
                        Gerar Grafo
                    </Button>
                </>
            )}
        </form>
    );
}