import { useGraph } from "@/contexts/GraphContext";
import { motion } from "motion/react";
import { PiGraph } from "react-icons/pi";
import { Button } from "../ui/button";

export default function NewGraph() {
    const { resetGraph } = useGraph();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Button className="cursor-pointer w-full" variant={'outline'} onClick={resetGraph}>
                <PiGraph />
                Novo grafo
            </Button>
        </motion.div>
    );
}