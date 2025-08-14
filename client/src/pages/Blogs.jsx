import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data: res } = await axios.get('/blogs');
        console.log('Fetched blogs:', res);
        setBlogs(res.data || []);
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      {blogs.length === 0 ? (
        <p className="text-muted-foreground">No blogs available yet.</p>
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id} className="shadow">
            <CardContent className="py-6">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="text-muted-foreground mt-2">{blog.content}</p>
              <p className="text-sm mt-4 text-right text-gray-500">
                By {blog.author_id || 'Admin'} • {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default BlogsPage;
