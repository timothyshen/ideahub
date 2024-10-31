'use client'

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { LatestIdeasSection } from "@/components/LatestIdeasSection"
import { CallToActionSection } from "@/components/CallToActionSection"

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