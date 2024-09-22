import { PostData } from '@/lib/types'
import React from 'react'
import { useDeletePostMutation } from './mutations';
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription } from '../ui/dialog';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';



interface DeletePostDialogProps {
    post: PostData,
    open: boolean;
    onClose: () => void,
}


const DeletePostDialog: React.FC<DeletePostDialogProps> = ({ post, open, onClose }) => {
    const mutation = useDeletePostMutation();


    const handleOpenChange = (open: boolean) => {
        if (!open || !mutation.isPending) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogHeader>Delete post?</DialogHeader>
                    <DialogDescription>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"outline"} onClick={onClose} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                    <LoadingButton variant={"destructive"} onClick={() => mutation.mutate(post.id, { onSuccess: onClose })} loading={mutation.isPending}>
                        Delete
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeletePostDialog;
