"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from 'lucide-react'
import { IdeaCard } from '@/components/idea/IdeaCard'
import { AddIdeaDialog } from '@/components/idea/AddIdeaDialog'
import { AttachLicenseDialog } from '@/components/idea/AttachLicenseDialog'
import { useStoryProtocol } from '@/hooks/useStoryProtocol';
import { useCollectionStore } from '@/store/collectionStore';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

export function UserDashboard() {
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

    const { createCollection, loading } = useStoryProtocol();
    const { address } = useAccount();
    const { collectionAddress, isCollectionCreated, setCollectionAddress } = useCollectionStore();

    const isOwner = address?.toLowerCase() === process.env.NEXT_PUBLIC_OWNER_WALLET_KEY?.toLowerCase();

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

    const handleCreateCollection = async () => {
        try {
            const collection = await createCollection();
            if (collection?.address) {
                setCollectionAddress(collection.address);
                toast.success("Collection created successfully!");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create collection");
        }
    };

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
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={handleCreateCollection}
                                disabled={loading || isCollectionCreated}
                            >
                                {loading ? "Creating..." : isCollectionCreated ? "Collection Created" : "Create Collection"}
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => setIsAddDialogOpen(true)}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Idea
                            </Button>
                        </div>
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
            {isOwner && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Collection Management</CardTitle>
                        <CardDescription>
                            {isCollectionCreated
                                ? `Collection Address: ${collectionAddress}`
                                : "Create a collection to start minting NFTs"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={handleCreateCollection}
                            disabled={loading || isCollectionCreated}
                        >
                            {loading ? "Creating..." : isCollectionCreated ? "Collection Created" : "Create Collection"}
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}