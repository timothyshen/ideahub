import Header from "@/components/Headers"
import Footer from "@/components/Footer"
import { IdeaGallery } from "@/components/IdeaHub"

export default function IdeaHubPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Explore Innovative Ideas</h1>
                <IdeaGallery />
            </main>
            <Footer />
        </div>
    )
}