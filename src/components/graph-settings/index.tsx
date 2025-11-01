"use client"
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "../ui/shadcn-io/tabs";
import ClassesSettings from "./classes";
import FreeSettings from "./free";

export const layouts = [
    { value: 'random', label: 'Aleatório' },
    { value: 'grid', label: 'Grade' },
    { value: 'circle', label: 'Circular' }
];

const tabs = [
    {
        value: 'classes',
        name: 'Classes',
        content: <ClassesSettings />
    },
    {
        value: 'free',
        name: 'Livre',
        content: <FreeSettings />
    }
];

export default function GraphSettings({
    children
}: { children: ReactNode }) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <Tabs defaultValue={tabs[0].value}>
                    <TabsList className="grid w-full grid-cols-2">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContents>
                        {tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value} className="">
                                {tab.content}
                            </TabsContent>
                        ))}
                    </TabsContents>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}