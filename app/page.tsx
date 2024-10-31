
import HomePageLayout from "@/components/layout/HomePageLayout"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { LatestIdeasSection } from "@/components/LatestIdeasSection"
import { CallToActionSection } from "@/components/CallToActionSection"

export function HomePageComponent() {
  return (
    <HomePageLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LatestIdeasSection />
      <CallToActionSection />
    </HomePageLayout>
  )
}