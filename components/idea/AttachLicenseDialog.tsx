import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttachLicenseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAttach: (license: string) => void;
}

export function AttachLicenseDialog({ isOpen, onClose, onAttach }) {
    const [selectedLicense, setSelectedLicense] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onAttach(selectedLicense)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Attach License</DialogTitle>
                    <DialogDescription>
                        Choose a license to attach to your idea. This will define how others can use your idea.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="license" className="text-right">
                                License Type
                            </Label>
                            <Select onValueChange={setSelectedLicense} value={selectedLicense}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a license" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MIT">MIT License</SelectItem>
                                    <SelectItem value="Apache-2.0">Apache License 2.0</SelectItem>
                                    <SelectItem value="GPL-3.0">GNU General Public License v3.0</SelectItem>
                                    <SelectItem value="CC-BY-4.0">Creative Commons Attribution 4.0</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={!selectedLicense}>Attach License</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}