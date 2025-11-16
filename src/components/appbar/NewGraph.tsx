import { useGraph } from "@/contexts/GraphContext";
import { motion } from "motion/react";
import { RippleButton } from "../ui/shadcn-io/ripple-button";
import { PiGraph } from "react-icons/pi";

export default function NewGraph() {
    const { graph, resetGraph } = useGraph();

    if (graph.matrix.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <RippleButton variant={'outline'} onClick={resetGraph}>
                <PiGraph />
                <span className="hidden md:inline">Novo grafo</span>
            </RippleButton>
        </motion.div>
    );
}