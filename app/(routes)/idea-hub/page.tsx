import IdeaHubLayout from "@/components/layout/IdeaHubLayout"
import { IdeaGallery } from "@/components/IdeaHub"

export default function IdeaHubPage() {
    return (
        <IdeaHubLayout>
            <h1 className="text-3xl font-bold mb-8 text-center">Explore Innovative Ideas</h1>
            <IdeaGallery />
        </IdeaHubLayout>
    )
} 