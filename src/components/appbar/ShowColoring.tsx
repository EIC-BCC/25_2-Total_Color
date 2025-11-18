import { useGraph } from "@/contexts/GraphContext";
import { PaletteIcon } from "lucide-react";
import { motion } from "motion/react";
import { RippleButton } from "../ui/shadcn-io/ripple-button";

export default function ShowColoringFab() {
    const { graph, viewColoring } = useGraph();

    if (!graph.totalColoring) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <RippleButton variant={'outline'} onClick={() => viewColoring()}>
                <PaletteIcon />
                <span className="hidden lg:inline">Apresentar Coloração</span>
            </RippleButton>
        </motion.div>
    );
}