'use client'

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
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Idea Hub',
  projectId: 'YOUR_PROJECT_ID',
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

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
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Idea Hub</Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link></li>
          </ul>
          <ConnectButton />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {currentYear} Idea Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}

function IdeaGallery() {
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState([0])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState(ideas)
  const ideasPerPage = 3
  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage)

  const allTags = Array.from(new Set(ideas.flatMap(idea => idea.tags)))
  const maxPrice = Math.max(...ideas.map(idea => idea.price))

  const handlePurchase = (id: number) => {
    console.log(`Purchasing idea ${id}`)
    // Implement purchase logic here
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  useEffect(() => {
    const filtered = ideas.filter(idea => 
      (selectedTags.length === 0 || selectedTags.some(tag => idea.tags.includes(tag))) &&
      idea.price <= priceRange[0]
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
        <div className="space-y-6 bg-gradient-to-b from-purple-100 to-pink-100 p-4 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-700">Filter by Tags</h3>
            {allTags.map(tag => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagChange(tag)}
                />
                <Label htmlFor={tag} className="text-gray-700">{tag}</Label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-700">Price Range</h3>
            <Slider
              min={0}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-gray-700">
              <span>$0</span>
              <span>${priceRange[0].toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedIdeas.map((idea) => (
              <div key={idea.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group">
                <div className="relative h-64">
                  <Image
                    src={idea.imageUrl}
                    alt={idea.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
                    <p className="text-sm">{idea.shortDescription}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 bg-opacity-95 flex flex-col items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <div className="w-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-yellow-400 text-purple-900">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-white text-justify mb-4 max-h-32 overflow-y-auto">
                      {idea.longDescription}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-bold text-yellow-300">
                      ${idea.price.toFixed(2)}
                    </p>
                    <Button 
                      onClick={() => handlePurchase(idea.id)}
                      className="bg-yellow-400 text-purple-900 hover:bg-yellow-300"
                    >
                      Get License
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} bg-purple-600 text-white hover:bg-purple-700`}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                    className={currentPage === index + 1 ? "bg-pink-500 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} bg-purple-600 text-white hover:bg-purple-700`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}

export function IdeaHub() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Explore Innovative Ideas</h1>
            <IdeaGallery />
          </main>
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}