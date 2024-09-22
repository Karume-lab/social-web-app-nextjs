"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";
import { postDataInclude } from '@/lib/types';



export const submitPost = async (input: string) => {
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized");
    const { content } = createPostSchema.parse({ content: input });

    const newPost = await prisma.post.create({
        data: {
            content,
            userId: user.id
        },
        include: postDataInclude
    });

    return newPost;
}
