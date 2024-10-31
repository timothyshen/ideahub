import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function LatestIdeasSection() {
    const latestIdeas = [
        {
            title: "Decentralized Content Moderation",
            description: "A blockchain-based system for fair and transparent content moderation on social media platforms.",
            image: "/placeholder.svg?height=200&width=300"
        },
        {
            title: "NFT-Powered Collaborative Storytelling",
            description: "A platform where users can create and evolve stories together, with each contribution minted as an NFT.",
            image: "/placeholder.svg?height=200&width=300"
        },
        {
            title: "Blockchain-Verified Carbon Credits",
            description: "A system to track and verify carbon credits on the blockchain, ensuring transparency and preventing double-counting.",
            image: "/placeholder.svg?height=200&width=300"
        }
    ]

    return (
        <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Latest On-Chain Ideas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestIdeas.map((idea, index) => (
                        <Card key={index}>
                            <Image
                                src={idea.image}
                                alt={idea.title}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <CardHeader>
                                <CardTitle>{idea.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{idea.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline">
                                    <Link href="/explore">View License Options</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}