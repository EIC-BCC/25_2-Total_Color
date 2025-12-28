import { useGraph } from "@/contexts/GraphContext";
import { ActionMode } from "@/types";
import { PlusIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface ButtonActionModeProps {
    actionMode: ActionMode,
    text: string
}

export default function ButtonActionMode({
    actionMode,
    text
}: ButtonActionModeProps) {
    const { graphView, changeGraphViewMode } = useGraph();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Button
                variant={'outline'}
                className={`
                    cursor-pointer w-full
                    ${graphView.actionMode === actionMode &&
                    "border-amber-500 bg-amber-500 hover:bg-amber-500 hover:text-white text-white"}`
                }
                onClick={() => changeGraphViewMode(actionMode)}
            >
                <PlusIcon />

                {text}
            </Button>
        </motion.div>
    );
}