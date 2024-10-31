import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-primary-foreground text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bring Your Ideas On-Chain with Idea Hub</h1>
                        <p className="text-xl mb-6">Discover, license, and build upon innovative ideas using the power of blockchain and Story Protocol.</p>
                        <Button asChild size="lg">
                            <Link href="/explore">Start Exploring Ideas</Link>
                        </Button>
                    </div>
                    <div className="md:w-1/2">
                        <Image
                            src="/placeholder.svg?height=400&width=600"
                            alt="Blockchain and ideas illustration"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}