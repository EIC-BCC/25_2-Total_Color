"use client"
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import ClassGraphGenerator from "./ClassGraphGenerator";
import FreeGraphGenerator from "./FreeGraphGenerator";
import { Modes } from "@/types";

export const layouts = [
    { value: 'random', label: 'Aleatório' },
    { value: 'grid', label: 'Grade' },
    { value: 'circle', label: 'Circular' }
];

interface GraphGeneratorProps {
    children?: ReactNode,
    mode: Modes
}

export default function GraphGenerator({
    children,
    mode
}: GraphGeneratorProps) {
    const [open, setOpen] = useState(false);

    const closeDialog = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {mode === 'classes' ?
                    <ClassGraphGenerator closeDialog={closeDialog} />
                    :
                    <FreeGraphGenerator closeDialog={closeDialog} />
                }
            </DialogContent>
        </Dialog>
    );
}