import { useGraph } from "@/contexts/GraphContext";
import { PaletteIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export default function ShowColoring() {
    const { viewColoring } = useGraph();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Button className="cursor-pointer w-full" variant={'outline'} onClick={() => viewColoring()}>
                <PaletteIcon />
                Apresentar Coloração
            </Button>
        </motion.div>
    );
}