import { Lightbulb, Shield, LinkIcon, Rocket } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export function HowItWorksSection() {
    const steps = [
        { icon: Lightbulb, title: "Submit Your Idea", description: "Upload your innovative idea to the blockchain through Idea Hub." },
        { icon: Shield, title: "Secure On-Chain", description: "Your idea is securely stored on-chain, establishing clear ownership and timestamp." },
        { icon: LinkIcon, title: "Set Licensing Terms", description: "Define how others can use your idea, including pricing and usage rights." },
        { icon: Rocket, title: "Enable Innovation", description: "Allow others to discover and license your idea for their projects, fostering innovation." }
    ]

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{step.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}