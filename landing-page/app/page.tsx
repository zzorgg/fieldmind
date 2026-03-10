import HeroSection from "@/components/hero-section"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import FooterSection from "@/components/footer"

export default function Page() {
  return (
    <>
      <HeroSection />
      <div className="bg-background">
        <Features />
        <HowItWorks />
        <FooterSection />
      </div>
    </>
  )
}
