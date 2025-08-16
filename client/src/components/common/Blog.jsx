import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, ExternalLink, BookOpen } from 'lucide-react';

const Blog = ({ blogs }) => {
  console.log('Blogs:', blogs);

  const heading = 'Latest Insights & Articles';
  const description =
    'Explore our latest thoughts on technology, innovation, and industry trends that shape the future of digital experiences.';

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'innovation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'design':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Knowledge Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Latest <span className="text-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-8">
          {blogs.map((post, index) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="grid gap-0 md:grid-cols-5 lg:grid-cols-3">
                  {/* Image Section */}
                  <div
                    className={`relative overflow-hidden md:col-span-2 lg:col-span-1 ${
                      index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <a
                      href={post.url || '#'}
                      target="_blank"
                      className="block group/image"
                      rel="noopener noreferrer"
                    >
                      <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] overflow-hidden relative">
                        <img
                          src={
                            post.image ||
                            'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&h=400&fit=crop'
                          }
                          alt={post.title}
                          className="h-full w-full object-cover transition-all duration-300 group-hover/image:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                            <ExternalLink className="w-3.5 h-3.5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Content Section */}
                  <div
                    className={`p-6 md:p-8 flex flex-col justify-center md:col-span-3 lg:col-span-2 ${
                      index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    {/* Tags */}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <Badge
                        className={`${getCategoryColor(post.category || 'Mechanical')} border-0 font-medium text-xs`}
                      >
                        {post.category || 'Mechanical'}
                      </Badge>
                      {(post.tags || ['Hackathon']).slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {post.title}
                      </a>
                    </h3>
                    {/* Summary */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    {/* Meta Info */}
                    <div className="flex items-center flex-wrap gap-3 text-xs md:text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="font-medium text-primary">8 min read</span>
                    </div>
                    {/* Read More Button */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="group/btn hover:shadow-md transition-all duration-300"
                        asChild
                      >
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/50"></div>
            <Button variant="outline" size="sm" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog };
