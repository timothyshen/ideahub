'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Link as LinkIcon, Shield, Rocket } from 'lucide-react'
import Header from "@/components/Headers"
import Footer from "@/components/Footer"


function HeroSection() {
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

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <Icon className="w-10 h-10 mb-2 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function FeaturesSection() {
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

function LatestIdeasSection() {
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

function HowItWorksSection() {
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

function CallToActionSection() {
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

export function HomePageComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LatestIdeasSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  )
}