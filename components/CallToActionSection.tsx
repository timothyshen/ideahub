import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CallToActionSection() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Bring Your Ideas On-Chain?</h2>
                <p className="text-xl mb-8">Join our community of innovators and start licensing your ideas with Story Protocol today.</p>
                <Button asChild size="lg" variant="secondary">
                    <Link href="/explore">Get Started</Link>
                </Button>
            </div>
        </section>
    )
}
