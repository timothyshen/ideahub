import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FilterPanel, FilterPanelProps } from "./FilterPanel";

export function MobileFilterDrawer({ selectedTags, setSelectedTags, priceRange, setPriceRange, allTags }: FilterPanelProps) {
    return (
        <div className="md:hidden mb-4">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Menu className="mr-2 h-4 w-4" /> Filters
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerDescription>Adjust your search criteria</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <FilterPanel
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            allTags={allTags}
                        />
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}