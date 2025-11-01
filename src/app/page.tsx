"use client"
import GraphVisualization from "@/components/graph-visualization";
import { GraphProvider } from "@/contexts/GraphContext";
import AppBar from "@/components/appbar";

export default function Home() {
    return (
        <main className="flex flex-col h-screen w-screen">
            <GraphProvider>
                <GraphVisualization />
                <AppBar />
            </GraphProvider>
        </main>
    );
}