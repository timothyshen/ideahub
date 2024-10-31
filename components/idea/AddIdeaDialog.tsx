import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AddIdeaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (idea: any) => void; // TODO: Add proper type
    editingIdea?: any; // TODO: Add proper type
}

export function AddIdeaDialog({ isOpen, onClose, onSubmit, editingIdea }: AddIdeaDialogProps) {
    const [newIdea, setNewIdea] = useState(
        editingIdea || {
            title: '',
            shortDescription: '',
            longDescription: '',
            tags: '',
            price: '',
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            ...newIdea,
            tags: typeof newIdea.tags === 'string' ? newIdea.tags.split(',').map(tag => tag.trim()) : newIdea.tags,
            price: parseFloat(newIdea.price),
            id: editingIdea ? editingIdea.id : Date.now(),
            listedDate: editingIdea ? editingIdea.listedDate : new Date().toLocaleDateString()
        })
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingIdea ? 'Edit Idea' : 'Add New Idea'}</DialogTitle>
                    <DialogDescription>
                        {editingIdea ? 'Update your idea details.' : 'List your innovative idea on the blockchain. Fill out the details below.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={newIdea.title}
                                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="shortDescription" className="text-right">
                                Short Description
                            </Label>
                            <Input
                                id="shortDescription"
                                value={newIdea.shortDescription}
                                onChange={(e) => setNewIdea({ ...newIdea, shortDescription: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="longDescription" className="text-right">
                                Long Description
                            </Label>
                            <Textarea
                                id="longDescription"
                                value={newIdea.longDescription}
                                onChange={(e) => setNewIdea({ ...newIdea, longDescription: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tags" className="text-right">
                                Tags
                            </Label>
                            <Input
                                id="tags"
                                value={typeof newIdea.tags === 'string' ? newIdea.tags : newIdea.tags.join(', ')}
                                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                                placeholder="Separate tags with commas"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                License Price ($)
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={newIdea.price}
                                onChange={(e) => setNewIdea({ ...newIdea, price: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{editingIdea ? 'Update Idea' : 'List Idea'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}