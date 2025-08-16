import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Wrench,
  Users,
  Trophy,
  Target,
  ArrowRight,
  Zap,
  Cog,
  Award,
  Play,
} from 'lucide-react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images data
  const carouselImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=800&fit=crop',
      title: 'Advanced Buggy Design',
      description: 'State-of-the-art mechanical engineering in action',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=800&fit=crop',
      title: 'Precision Engineering',
      description: 'Cutting-edge mechanical solutions and innovations',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop',
      title: 'Team Collaboration',
      description: 'Engineers working together on breakthrough projects',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1581092446297-9048b6a41bb4?w=1200&h=800&fit=crop',
      title: 'Innovation Lab',
      description: 'Where creativity meets mechanical excellence',
    },
  ];

  // Sponsors data
  const sponsors = [
    {
      id: 1,
      name: 'TechCorp',
      logo: 'https://via.placeholder.com/200x100/3B82F6/FFFFFF?text=TechCorp',
    },
    {
      id: 2,
      name: 'InnovateLab',
      logo: 'https://via.placeholder.com/200x100/10B981/FFFFFF?text=InnovateLab',
    },
    {
      id: 3,
      name: 'FutureTech',
      logo: 'https://via.placeholder.com/200x100/8B5CF6/FFFFFF?text=FutureTech',
    },
    {
      id: 4,
      name: 'MechPro',
      logo: 'https://via.placeholder.com/200x100/F59E0B/FFFFFF?text=MechPro',
    },
    {
      id: 5,
      name: 'DevSolutions',
      logo: 'https://via.placeholder.com/200x100/EF4444/FFFFFF?text=DevSolutions',
    },
    {
      id: 6,
      name: 'NextGen',
      logo: 'https://via.placeholder.com/200x100/06B6D4/FFFFFF?text=NextGen',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {carouselImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Wrench className="w-4 h-4" />
            Engineering Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Mechanical <span className="text-primary">Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {carouselImages[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              <Play className="w-5 h-5 mr-2" />
              Watch Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              About <span className="text-primary">Our Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Passionate engineers and innovators dedicated to pushing the boundaries of mechanical
              design and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Engineering the Future</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Our team combines years of mechanical engineering expertise with cutting-edge
                technology to create innovative solutions. From conceptual design to final
                implementation, we deliver excellence in every project.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Specializing in buggy design, mechanical systems, and advanced engineering
                solutions, we've established ourselves as leaders in the field through consistent
                innovation and technical excellence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600&h=400&fit=crop"
                alt="Our Workshop"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <Award className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 dark:bg-gray-900/90">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Cog className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Mechanical Design</h4>
                <p className="text-muted-foreground text-sm">
                  Advanced CAD modeling and mechanical system design with precision engineering
                  principles.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 dark:bg-gray-900/90">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Innovation</h4>
                <p className="text-muted-foreground text-sm">
                  Cutting-edge solutions that push the boundaries of what's possible in mechanical
                  engineering.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/90 dark:bg-gray-900/90">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Precision</h4>
                <p className="text-muted-foreground text-sm">
                  Meticulous attention to detail ensuring every component meets the highest quality
                  standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              Partners & Sponsors
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Trusted <span className="text-primary">Partners</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We're proud to work with industry-leading companies that share our vision for
              innovation
            </p>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Partner With Us?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our network of innovative partners and sponsors who are shaping the future of
                mechanical engineering.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
