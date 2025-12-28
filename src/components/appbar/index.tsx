import { HexadecimalColors } from "../graph-viewer/ViewerUtils";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import AppbarItems from "./AppbarItems";
import { useState } from "react";

export default function AppBar() {
    const title = "Total-Color";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <menu className="bg-gradient-to-r from-blue-500 to-blue-400 flex gap-4 items-center justify-between px-4 py-3 relative shadow">

            <h1 className="font-semibold select-none text-xl lg:text-[22px] text-white">
                {title.split("").map((char, index) => (
                    <span
                        key={index}
                        onMouseEnter={(e) => e.currentTarget.style.color = HexadecimalColors.get(index)}
                        onMouseLeave={(e) => e.currentTarget.style.color = ""}
                    >
                        {char}
                    </span>
                ))}
            </h1>

            <div className="hidden xl:flex flex-wrap gap-2">
                <AppbarItems />
            </div>

            <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
                <DrawerTrigger asChild>
                    <Button className="cursor-pointer inline xl:hidden" variant="outline">
                        <MenuIcon />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="bg-gray-200 flex flex-col h-full w-full">
                        <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                            <DrawerDescription></DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-col gap-4 p-4">
                            <AppbarItems onItemClick={() => setMobileMenuOpen(false)} />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

        </menu>
    );
}