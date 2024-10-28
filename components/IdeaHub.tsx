"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu } from "lucide-react"

interface Idea {
  id: number
  title: string
  shortDescription: string
  longDescription: string
  imageUrl: string
  price: number
  tags: string[]
}

const ideas: Idea[] = [
  {
    id: 1,
    title: "Smart Home Assistant",
    shortDescription: "AI-powered home assistant",
    longDescription: "An AI-powered home assistant that learns your habits and preferences. It can control your smart devices, manage your schedule, and even predict your needs before you ask.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 199.99,
    tags: ["DeFi", "Creator Tool"]
  },
  {
    id: 2,
    title: "Eco-Friendly Water Bottle",
    shortDescription: "Self-cleaning water purifier",
    longDescription: "A self-cleaning water bottle that purifies water as you drink. It uses UV-C light to eliminate up to 99.9999% of bacteria and viruses, ensuring you always have clean water on the go.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 49.99,
    tags: ["Art", "Game"]
  },
  {
    id: 3,
    title: "Virtual Reality Fitness",
    shortDescription: "Immersive workout experience",
    longDescription: "A VR system that makes working out feel like an immersive game. Choose from various virtual environments and workout programs, making exercise fun and engaging for all fitness levels.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 299.99,
    tags: ["Game", "Creator Tool"]
  },
  {
    id: 4,
    title: "Solar-Powered Backpack",
    shortDescription: "Charge devices on the go",
    longDescription: "A backpack with built-in solar panels to charge your devices on the go. It features a sleek design, multiple charging ports, and a built-in power bank for cloudy days.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 129.99,
    tags: ["DeFi", "Art"]
  },
  {
    id: 5,
    title: "AI Writing Assistant",
    shortDescription: "Enhance your writing with AI",
    longDescription: "An AI-powered writing assistant that helps you improve your writing style, grammar, and vocabulary. It adapts to your personal writing style and provides contextual suggestions.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 79.99,
    tags: ["Creator Tool", "DeFi"]
  },
  {
    id: 6,
    title: "Augmented Reality Glasses",
    shortDescription: "See the world enhanced",
    longDescription: "Stylish AR glasses that overlay digital information on the real world. Navigate cities, translate signs in real-time, and experience interactive entertainment like never before.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    price: 499.99,
    tags: ["Game", "Art"]
  }
]

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold">Idea Hub</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/explore" className="hover:underline">Explore</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <Button variant="secondary" size="sm">Connect</Button>
      </div>
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-primary text-primary-foreground py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} Idea Hub. All rights reserved.</p>
        <p className="mt-2 text-sm">Powered by Story</p>
      </div>
    </footer>
  )
}

function FilterContent({ selectedTags, setSelectedTags, priceRange, setPriceRange, allTags }) {
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Filter by Tags</h3>
        {allTags.map(tag => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => handleTagChange(tag)}
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

function IdeaCard({ idea, onPurchase }: { idea: Idea, onPurchase: (id: number) => void }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group">
      <div className="relative h-64">
        <Image
          src={idea.imageUrl}
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

function NoMatchingItems() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center bg-muted p-8 rounded-lg">
      <h3 className="text-2xl font-semibold mb-2">No matching items found</h3>
      <p className="text-muted-foreground text-center">
        Try adjusting your filters or explore different tags to discover more ideas.
      </p>
    </div>
  )
}

function IdeaGallery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState(ideas)
  const ideasPerPage = 3
  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage)

  const allTags = Array.from(new Set(ideas.flatMap(idea => idea.tags)))

  const handlePurchase = (id: number) => {
    console.log(`Purchasing idea ${id}`)
    // Implement purchase logic here
  }

  useEffect(() => {
    const filtered = ideas.filter(idea =>
      (selectedTags.length === 0 || selectedTags.some(tag => idea.tags.includes(tag))) &&
      idea.price >= priceRange[0] && idea.price <= priceRange[1]
    )
    setFilteredIdeas(filtered)
    setCurrentPage(1)
  }, [selectedTags, priceRange])

  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * ideasPerPage,
    currentPage * ideasPerPage
  )

  return (
    <>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <div className="hidden md:block">
          <FilterContent
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            allTags={allTags}
          />
        </div>
        <div>
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
                  <FilterContent
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 min-h-[400px]">
            {paginatedIdeas.length > 0 ? (
              paginatedIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} onPurchase={handlePurchase} />
              ))
            ) : (
              <NoMatchingItems />
            )}
          </div>
          {filteredIdeas.length > 0 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  )
}

export default function IdeaHubPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Explore Innovative Ideas</h1>
        <IdeaGallery />
      </main>
      <Footer />
    </div>
  )
}