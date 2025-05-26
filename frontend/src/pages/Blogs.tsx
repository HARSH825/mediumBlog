import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks";
import {format} from "date-fns"
export const Blogs = () => {
    const { loading, blogs, error } = useBlogs();
    const [currentPage,setCurrentPage] = useState(1);
    const blogsPerPage = 8;

    const idxOfLastBlog = currentPage*blogsPerPage;
    const indexOfFirstBlog = idxOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, idxOfLastBlog);

    if (loading) {
        return (
            <div>
                <Appbar /> 
                <div className="flex justify-center">
                    <div>
                        {/* Loading skeletons */}
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Appbar />
                <div className="flex justify-center">
                    <div className="text-red-500 text-center mt-8">
                        <p>Error loading blogs: {error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {blogs.length === 0 ? (
                        <div className="text-center mt-8 text-gray-500">
                            No blogs found
                        </div>
                    ) : (
                        currentBlogs.map((blog) => (
                            <BlogCard
                                key={blog.id} 
                                id={blog.id}
                                authorName={blog.author?.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={
                                blog.publishedDate
                                ? format(new Date(blog.publishedDate), "dd MMM yyyy, hh:mm a")
                                : "Unknown"
                                }
                            />
                        ))
                    )}
                </div>
            </div>
                            <div className="flex justify-center mt-6 gap-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600 pt-2">Page {currentPage}</span>
                <button
                    onClick={() =>
                    setCurrentPage((prev) =>
                        prev < Math.ceil(blogs.length / blogsPerPage) ? prev + 1 : prev
                    )
                    }
                    disabled={currentPage >= Math.ceil(blogs.length / blogsPerPage)}
                    className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
                </div>

        </div>
    );
}