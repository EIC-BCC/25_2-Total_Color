"use client"
import GraphViewer from "@/components/graph-viewer";
import AppBar from "@/components/appbar";
import { GraphProvider } from "@/contexts/GraphContext";

export default function Home() {
    return (
        <main className="flex flex-col h-screen overflow-hidden w-screen">
            <GraphProvider>
                <AppBar />
                <GraphViewer />
            </GraphProvider>
        </main>
    );
}