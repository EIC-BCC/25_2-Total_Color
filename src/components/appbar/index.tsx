import { Settings2Icon } from "lucide-react";
import GraphSettings from "../graph-settings";

export default function AppBar() {
    return (
        <menu className="border border-gray-400 bg-gray-100 flex items-center justify-around p-2 rounded-t-md shadow-lg">
            <span></span>

            <h2 className="font-bold text-lg select-none">Total-Color</h2>
            
            <GraphSettings>
                <div className="border border-gray-200 bg-white cursor-pointer hover:opacity-60 p-2 rounded duration-300">
                    <Settings2Icon className="h-6 w-6" />
                </div>
            </GraphSettings>
        </menu>
    );
}