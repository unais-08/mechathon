import { Card, CardContent } from '@/components/ui/card';

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    excerpt: 'Learn how to set up your first React project step-by-step.',
    author: 'Shaikh Unais',
    date: '2025-08-18',
  },
  {
    id: 2,
    title: 'Understanding State in React',
    excerpt: 'State is the heart of any interactive component in React.',
    author: 'Jane Doe',
    date: '2025-08-16',
  },
  {
    id: 3,
    title: 'Deploying with Vercel',
    excerpt: 'A quick guide to deploying React apps using Vercel.',
    author: 'John Smith',
    date: '2025-08-14',
  },
];

const BlogList = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Latest Blog Posts</h2>
        <p className="text-muted-foreground">
          Explore our recent articles, tutorials, and updates.
        </p>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6 space-y-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="text-xs text-muted-foreground">
                By {post.author} &middot; {post.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
