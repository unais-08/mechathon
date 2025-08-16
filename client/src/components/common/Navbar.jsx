import React from 'react';
import { Menu, Home, BookOpen, History, Settings, User, LogOut, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, adminData, logout } = useAuth();
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/blogs', label: 'Blogs', icon: BookOpen },
    { path: '/history', label: 'History', icon: History },
  ];

  const adminFeatures = [
    {
      title: 'Dashboard',
      description: 'Overview of your activity and analytics',
      href: '/admin/dashboard',
      icon: '📊',
    },
    {
      title: 'Create Blog',
      description: 'Write and publish new blog posts',
      href: '/admin/create-blog',
      icon: '✍️',
    },
    {
      title: 'Track History',
      description: 'Manage hackathon and event history',
      href: '/admin/create-history',
      icon: '📝',
    },
    {
      title: 'Sponsor Requests',
      description: 'Review and manage sponsor applications',
      href: '/admin/sponsors',
      icon: '🤝',
    },
    {
      title: 'Manage Blogs',
      description: 'Edit and organize your blog content',
      href: '/admin/blogs',
      icon: '📚',
    },
    {
      title: 'Team Settings',
      description: 'Configure team and system settings',
      href: '/admin/settings',
      icon: '⚙️',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-lg">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">Mechathon</span>
              <span className="text-xs text-muted-foreground -mt-1">Engineering Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-1 items-center">
              {publicNavItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.path}
                      className="flex items-center h-10 px-4 text-sm font-medium transition-colors hover:text-primary"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center h-10 px-4 text-sm font-medium gap-2">
                    <Settings className="w-4 h-4" />
                    Admin Panel
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                      {adminFeatures.length}
                    </Badge>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[640px] grid-cols-2 gap-3 p-4">
                      <div className="col-span-2 mb-2">
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          Admin Dashboard
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Manage your platform and content
                        </p>
                      </div>
                      {adminFeatures.map((feature, index) => (
                        <NavigationMenuLink
                          key={index}
                          asChild
                          className="block rounded-lg p-3 transition-colors hover:bg-muted/50 border border-transparent hover:border-border"
                        >
                          <Link to={feature.href}>
                            <div className="flex items-start gap-3">
                              <span className="text-lg">{feature.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-sm text-foreground mb-1">
                                  {feature.title}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Link to="/admin/login">
                <Button variant="default" size="sm" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Admin Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="relative">
                <Menu className="h-4 w-4" />
                {isAuthenticated && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px]">
              <SheetHeader className="space-y-4">
                <SheetTitle className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                    <Wrench className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">Mechathon</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col mt-8 space-y-6">
                {isAuthenticated && (
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{adminData?.name || 'Admin'}</p>
                      <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Navigation
                  </h3>
                  {publicNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {isAuthenticated && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="admin-features" className="border-none">
                      <AccordionTrigger className="text-sm font-semibold text-muted-foreground uppercase tracking-wider hover:no-underline">
                        Admin Panel ({adminFeatures.length})
                      </AccordionTrigger>
                      <AccordionContent className="space-y-1 pt-2">
                        {adminFeatures.map((feature, index) => (
                          <Link
                            key={index}
                            to={feature.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted group"
                          >
                            <span className="text-base">{feature.icon}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary">
                                {feature.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {feature.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <div className="pt-4 border-t border-border">
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="w-full flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  ) : (
                    <Link to="/admin/login" className="block w-full">
                      <Button variant="default" className="w-full flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Admin Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
