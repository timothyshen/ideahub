import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export interface FilterPanelProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  allTags: string[];
}

export function FilterPanel({ selectedTags, setSelectedTags, priceRange, setPriceRange, allTags }: FilterPanelProps) {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Filter by Tags</h3>
        {allTags.map(tag => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => setSelectedTags(selectedTags)}
            />
            <Label htmlFor={tag}>{tag}</Label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
} 