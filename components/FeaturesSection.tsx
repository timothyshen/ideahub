import { FeatureCard } from "@/components/FeatureCard"
import { Lightbulb, LinkIcon, Shield } from "lucide-react"

export function FeaturesSection() {
    const features = [
        {
            icon: Lightbulb,
            title: "On-Chain Ideas",
            description: "Securely store and manage your innovative ideas on the blockchain, ensuring transparency and immutability."
        },
        {
            icon: LinkIcon,
            title: "Easy Licensing",
            description: "Seamlessly license ideas for your projects using Story Protocol, streamlining the process of idea acquisition and usage rights."
        },
        {
            icon: Shield,
            title: "Intellectual Property Protection",
            description: "Leverage blockchain technology to protect your intellectual property and track idea usage across projects."
        }
    ]

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Idea Hub?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    )
}