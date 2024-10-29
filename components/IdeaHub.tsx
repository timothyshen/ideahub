"use client"
import { useState, useEffect } from 'react'

import { PaginationControls } from '@/components/explore/PaginationControls'
import { IdeaCard } from '@/components/explore/IdeaCard'
import { MobileFilterDrawer } from '@/components/explore/MobileFilterDrawer'
import { FilterPanel } from '@/components/explore/FilterPanel'

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
export function IdeaGallery() {
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
          <FilterPanel
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            allTags={allTags}
          />
        </div>
        <div>
          <MobileFilterDrawer
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            allTags={allTags}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredIdeas.length > 0 ? paginatedIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onPurchase={handlePurchase} />
            )) : <NoMatchingItems />}
          </div>
          {filteredIdeas.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  )
}

