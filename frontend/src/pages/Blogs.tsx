import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs, error } = useBlogs();

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
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.id} 
                                id={blog.id}
                                authorName={blog.author?.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"24th April 2025"}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}