import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Convert this to a proper layout component
export default function HomePageLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}