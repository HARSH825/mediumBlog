import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
        
        const jwt = await sign({id: user.id}, "secret");
        return c.json({
            msg:"User created successfully",
            jwt:jwt
        });
    }
    catch(error) {
        c.status(411);
        return c.text("Failed to create : " + error);
    }
});

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if(!user) {
            c.status(403);
            return c.json({
                msg: "incorrect creds"
            });
        }

        const jwt = await sign({id: user.id}, "secret");
        return c.json({
            msg:"login successfull",
            jwt:jwt
        });
    }
    catch(err) {
        c.status(411);
        return c.text("Invalid : " + err);
    }
});

export default userRouter;