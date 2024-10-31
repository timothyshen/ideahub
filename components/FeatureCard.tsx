import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "lucide-react";

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}


export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
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