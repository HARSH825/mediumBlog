import z from 'zod';

export const signupInput  = z.object({
    email : z.string().email(),
    password:z.string(),
    name:z.string().optional()
})


export const signinInput  = z.object({
    email : z.string().email(),
    password:z.string(),
})


export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})
//above this , variables will be used by backend

//below this ,types willbe used by frontend ( maintiang state)
export type SignUpInput = z.infer<typeof signupInput>;
export type SignInInput =  z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>