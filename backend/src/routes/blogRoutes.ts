import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@harshchh/medium-common";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string 
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    
    try {
        const user = await verify(token, "secret");
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({msg: "Forbidden. You are not logged in"});
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }
});

blogRouter.post('/post', async (c) => {
    const body = await c.req.json();
    const authorId = c.get('userId');
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({msg:"Invalid inputs, z validation faield"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    });

    return c.json({id: post.id});
});

blogRouter.put('/post', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({msg:"Inputs invalid, z validation failed."});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.update({
        where: {
            id: body.id 
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: post.id
    });
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            },
            publishedDate:true
        }
    });

    return c.json({posts: posts});
});

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            post
        });
    } catch(e) {
        c.status(411); 
        return c.json({
            message: "Error while fetching blog post"
        });
    }
});