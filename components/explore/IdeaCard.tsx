import Image from 'next/image';
import nextSVG from '@/public/next.svg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Idea } from '@/types/exploreTypes';

interface IdeaProps {
  idea: Idea;
  onPurchase: (id: number) => void;
}

export function IdeaCard({ idea, onPurchase }: IdeaProps) {
  return (
    <div key={idea.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group">
      <div className="relative h-64">
        <Image
          src={nextSVG}
          alt={idea.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
          <p className="text-sm">{idea.shortDescription}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="w-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="text-primary-foreground text-justify mb-4 max-h-32 overflow-y-auto">
            {idea.longDescription}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-bold text-primary-foreground">
            ${idea.price.toFixed(2)}
          </p>
          <Button
            onClick={() => onPurchase(idea.id)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Get License
          </Button>
        </div>
      </div>
    </div>
  )
}