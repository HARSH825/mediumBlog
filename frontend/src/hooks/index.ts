import { useEffect, useState } from "react"
import { BACKEND_URL } from "../components/config";
import axios from "axios";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
        id?: string;
    };
    publishedDate?: string;
}



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getBlogs();
    }, [])

    const getBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${BACKEND_URL}api/v1/blog/bulk` , {
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });
            setBlogs(response.data.posts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        blogs,
        error,
        // refetch: getBlogs // Added refetch functionality
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}