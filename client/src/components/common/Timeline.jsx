import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Trophy, Lightbulb } from 'lucide-react';

const Timeline = (props) => {
  const { history } = props;

  // Fallback data if no history is provided
  const defaultHistory = [
    {
      created_at: '2025-08-13T09:29:54.753Z',
      description:
        'Developed a comprehensive smart city management system that integrates IoT sensors, real-time data analytics, and citizen engagement platforms to optimize urban infrastructure and improve quality of life for residents.',
      id: 1,
      position: 1,
      project_title: 'Smart City Solutions',
      team_name: 'Team Innovators',
      title: 'Hackathon 2023',
      year: 2023,
    },
    {
      created_at: '2024-12-15T14:20:30.123Z',
      description:
        'Created an innovative mobile application focused on sustainable living practices, featuring carbon footprint tracking, eco-friendly product recommendations, and community challenges to promote environmental consciousness.',
      id: 2,
      position: 2,
      project_title: 'EcoLife App',
      team_name: 'Green Developers',
      title: 'Tech Challenge 2024',
      year: 2024,
    },
    {
      created_at: '2024-06-20T11:45:12.456Z',
      description:
        'Built an AI-powered educational platform designed for remote learning environments, incorporating adaptive learning algorithms, real-time collaboration tools, and comprehensive progress analytics for educators and students.',
      id: 3,
      position: 3,
      project_title: 'LearnAI Platform',
      team_name: 'EduTech Pioneers',
      title: 'Innovation Summit 2024',
      year: 2024,
    },
  ];

  const timelineData = history && history.length > 0 ? history : defaultHistory;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Get category color based on project type
  const getCategoryColor = (title) => {
    if (title.toLowerCase().includes('hackathon')) return 'bg-purple-500';
    if (title.toLowerCase().includes('challenge')) return 'bg-green-500';
    if (title.toLowerCase().includes('summit')) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const getCategoryBadgeColor = (title) => {
    if (title.toLowerCase().includes('hackathon'))
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    if (title.toLowerCase().includes('challenge'))
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (title.toLowerCase().includes('summit'))
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Achievement Timeline
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Event <span className="text-primary">History</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of our journey through innovation challenges, hackathons, and
            technology summits
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30"></div>

          {timelineData.map((entry, index) => (
            <div
              key={entry.id || entry.title}
              className={`relative mb-8 md:mb-10 ${
                index % 2 === 0 ? 'md:pr-1/2 md:mr-6' : 'md:pl-1/2 md:ml-6'
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 md:left-1/2 md:-ml-2.5 top-6 w-5 h-5 rounded-full border-3 border-background shadow-md ${getCategoryColor(entry.title)} z-10`}
              >
                <div className="absolute inset-0.5 bg-white dark:bg-gray-800 rounded-full"></div>
              </div>

              {/* Content card */}
              <div className="ml-12 md:ml-0">
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {/* Date and year badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      <Badge className={`${getCategoryBadgeColor(entry.title)} border-0 text-xs`}>
                        {entry.year}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {entry.title}
                    </h3>

                    {/* Project details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                        <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            Project
                          </p>
                          <p
                            className="font-semibold text-foreground text-sm truncate"
                            title={entry.project_title}
                          >
                            {entry.project_title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            Team
                          </p>
                          <p
                            className="font-semibold text-foreground text-sm truncate"
                            title={entry.team_name}
                          >
                            {entry.team_name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {entry.description}
                      </p>
                    </div>

                    {/* Position indicator */}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium">
                          Position #{entry.position}
                        </span>
                        <div className="flex gap-1">
                          {[...Array(Math.min(5, entry.position || 1))].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                          ))}
                          {[...Array(Math.max(0, 5 - (entry.position || 1)))].map((_, i) => (
                            <div
                              key={`empty-${i}`}
                              className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/50"></div>
            <span className="text-sm font-medium">Journey Continues</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline };
