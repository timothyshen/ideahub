import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, FileText } from 'lucide-react'
import { useStoryProtocol } from '@/hooks/useStoryProtocol';

export interface IdeaCardProps {
    idea: any; // TODO: Add proper type
    onEdit: (idea: any) => void;
    onDelete: (id: number) => void;
    onAttachLicense: (id: number) => void;
}

export function IdeaCard({ idea, onEdit, onDelete, onAttachLicense }: IdeaCardProps) {
    const { registerIPAsset, loading, error } = useStoryProtocol();

    const handleRegisterIP = async () => {
        try {
            await registerIPAsset(
                idea.title,
                idea.description,
                idea.mediaUrl // Make sure you have this field in your idea object
            );
            // Handle success (e.g., show toast notification)
        } catch (err) {
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{idea.title}</span>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(idea)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(idea.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardTitle>
                <CardDescription>{idea.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{idea.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                {idea.license ? (
                    <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">License Attached: {idea.license}</span>
                    </div>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => onAttachLicense(idea.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Attach License
                    </Button>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">License Price: ${idea.price}</span>
                <span className="text-sm text-muted-foreground">Listed on: {idea.listedDate}</span>
            </CardFooter>
            <div className="card-actions">
                <button 
                    onClick={handleRegisterIP}
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading ? 'Registering...' : 'Register IP'}
                </button>
            </div>
        </Card>
    )
}