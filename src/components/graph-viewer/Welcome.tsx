import { motion } from "motion/react";
import GraphGenerator from "../graph-generator";

export default function Welcome() {
    return (
        <motion.div
            className="flex flex-col flex-wrap items-center justify-center md:flex-row gap-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <GraphGenerator graphMode="classes">
                <div className="border-2 border-l-4 bg-white cursor-pointer duration-200 hover:border-l-blue-500 hover:scale-102 flex flex-col gap-2 p-4 rounded-lg ease-in-out max-w-sm shadow-md">
                    <h2 className="font-bold text-xl">
                        Classes
                    </h2>

                    <p className="">
                        Visualize classes de grafos, realize a coloração total e verifique a solução.
                    </p>
                </div>
            </GraphGenerator>

            <GraphGenerator graphMode="free">
                <div className="border-2 border-l-4 bg-white cursor-pointer duration-200 hover:border-l-blue-500 hover:scale-102 flex flex-col gap-2 p-4 rounded-lg ease-in-out max-w-sm shadow-md">
                    <h2 className="font-bold text-xl">
                        Livre
                    </h2>

                    <p className="">
                        Adicione um .txt com uma matriz de adjacência ou um arquivo .g6, e realize a coloração total.
                    </p>
                </div>
            </GraphGenerator>
        </motion.div>
    );
}