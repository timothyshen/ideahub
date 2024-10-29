'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, Plus, Edit, Trash2, FileText } from 'lucide-react'

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
        <div className="flex items-center space-x-4">
          <span className="text-sm">Connected: 0x1234...5678</span>
          <Button variant="secondary" size="sm">Disconnect</Button>
        </div>
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
        <p className="mt-2 text-sm">Powered by Story Protocol</p>
      </div>
    </footer>
  )
}

function IdeaCard({ idea, onEdit, onDelete, onAttachLicense }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{idea.title}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(idea)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(idea.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>{idea.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{idea.longDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        {idea.license ? (
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">License Attached: {idea.license}</span>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => onAttachLicense(idea.id)}>
            <FileText className="mr-2 h-4 w-4" />
            Attach License
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">License Price: ${idea.price}</span>
        <span className="text-sm text-muted-foreground">Listed on: {idea.listedDate}</span>
      </CardFooter>
    </Card>
  )
}

function AddIdeaDialog({ isOpen, onClose, onSubmit, editingIdea }) {
  const [newIdea, setNewIdea] = useState(
    editingIdea || {
      title: '',
      shortDescription: '',
      longDescription: '',
      tags: '',
      price: '',
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...newIdea,
      tags: typeof newIdea.tags === 'string' ? newIdea.tags.split(',').map(tag => tag.trim()) : newIdea.tags,
      price: parseFloat(newIdea.price),
      id: editingIdea ? editingIdea.id : Date.now(),
      listedDate: editingIdea ? editingIdea.listedDate : new Date().toLocaleDateString()
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingIdea ? 'Edit Idea' : 'Add New Idea'}</DialogTitle>
          <DialogDescription>
            {editingIdea ? 'Update your idea details.' : 'List your innovative idea on the blockchain. Fill out the details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shortDescription" className="text-right">
                Short Description
              </Label>
              <Input
                id="shortDescription"
                value={newIdea.shortDescription}
                onChange={(e) => setNewIdea({ ...newIdea, shortDescription: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longDescription" className="text-right">
                Long Description
              </Label>
              <Textarea
                id="longDescription"
                value={newIdea.longDescription}
                onChange={(e) => setNewIdea({ ...newIdea, longDescription: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={typeof newIdea.tags === 'string' ? newIdea.tags : newIdea.tags.join(', ')}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                placeholder="Separate tags with commas"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                License Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                value={newIdea.price}
                onChange={(e) => setNewIdea({ ...newIdea, price: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{editingIdea ? 'Update Idea' : 'List Idea'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AttachLicenseDialog({ isOpen, onClose, onAttach }) {
  const [selectedLicense, setSelectedLicense] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAttach(selectedLicense)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attach License</DialogTitle>
          <DialogDescription>
            Choose a license to attach to your idea. This will define how others can use your idea.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="license" className="text-right">
                License Type
              </Label>
              <Select onValueChange={setSelectedLicense} value={selectedLicense}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a license" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MIT">MIT License</SelectItem>
                  <SelectItem value="Apache-2.0">Apache License 2.0</SelectItem>
                  <SelectItem value="GPL-3.0">GNU General Public License v3.0</SelectItem>
                  <SelectItem value="CC-BY-4.0">Creative Commons Attribution 4.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!selectedLicense}>Attach License</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UserDashboard() {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Decentralized Content Moderation",
      shortDescription: "Blockchain-based content moderation",
      longDescription: "A blockchain-based system for fair and transparent content moderation on social media platforms.",
      tags: ["Blockchain", "Social Media", "Moderation"],
      price: 299.99,
      listedDate: "2023-05-15",
      license: "MIT"
    },
    {
      id: 2,
      title: "NFT-Powered Collaborative Storytelling",
      shortDescription: "Create stories with NFTs",
      longDescription: "A platform where users can create and evolve stories together, with each contribution minted as an NFT.",
      tags: ["NFT", "Storytelling", "Collaboration"],
      price: 199.99,
      listedDate: "2023-06-01"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAttachLicenseDialogOpen, setIsAttachLicenseDialogOpen] = useState(false)
  const [editingIdea, setEditingIdea] = useState(null)
  const [currentIdeaId, setCurrentIdeaId] = useState(null)

  const handleAddIdea = (newIdea) => {
    setIdeas([...ideas, newIdea])
  }

  const handleEditIdea = (idea) => {
    setEditingIdea(idea)
    setIsAddDialogOpen(true)
  }

  const handleUpdateIdea = (updatedIdea) => {
    setIdeas(ideas.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea))
    setEditingIdea(null)
  }

  const handleDeleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id))
  }

  const handleAttachLicense = (id) => {
    setCurrentIdeaId(id)
    setIsAttachLicenseDialogOpen(true)
  }

  const attachLicense = (license) => {
    setIdeas(ideas.map(idea =>
      idea.id === currentIdeaId ? { ...idea, license } : idea
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Idea Dashboard</h1>
      <Tabs defaultValue="listed" className="w-full">
        <TabsList>
          <TabsTrigger value="listed">Listed Ideas</TabsTrigger>
          <TabsTrigger value="stats">Stats & Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="listed">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Listed Ideas</h2>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Idea
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map(idea => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onEdit={handleEditIdea}
                onDelete={handleDeleteIdea}
                onAttachLicense={handleAttachLicense}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <h2 className="text-2xl font-semibold mb-4">Your Stats & Earnings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Ideas Listed</p>
                  <p className="text-2xl font-bold">{ideas.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Earnings</p>
                  <p className="text-2xl font-bold">$1,245.50</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Ideas Licensed</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Avg. License Price</p>
                  <p className="text-2xl font-bold">${(ideas.reduce((sum,
                    idea) => sum + idea.price, 0) / ideas.length).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <AddIdeaDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false)
          setEditingIdea(null)
        }}
        onSubmit={editingIdea ? handleUpdateIdea : handleAddIdea}
        editingIdea={editingIdea}
      />
      <AttachLicenseDialog
        isOpen={isAttachLicenseDialogOpen}
        onClose={() => setIsAttachLicenseDialogOpen(false)}
        onAttach={attachLicense}
      />
    </div>
  )
}

export default function UserPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  )
}