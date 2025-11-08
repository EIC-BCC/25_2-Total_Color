import { PlusIcon, PyramidIcon } from "lucide-react";
import GraphGenerator from "../graph-generator";
import { motion } from "motion/react";

export default function GenerateGraphFab() {
    return (
        <GraphGenerator>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                className="border border-gray-200 bg-white bottom-8 cursor-pointer fixed flex gap-2 hover:opacity-60 p-2 right-8 rounded duration-300 z-10"
            >
                <div className="flex">
                    <PyramidIcon />
                    <PlusIcon size={15} />
                </div>

                Criar grafo
            </motion.div>
        </GraphGenerator>
    );
}