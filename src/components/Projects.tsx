import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Particles from "@/components/Particles"; // ✅ Import the Particle
interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  codeLink?: string;
  liveLink?: string;
  liveLinks?: { label: string; url: string }[];
}

const projects: ProjectItem[] = [
  {
    title: "QBox — Smart Device Distribution Platform",
    description:
      "A complete smart device distribution ecosystem consisting of three apps: a Merchant App for device ordering & tracking, an Agent App for assigned deliveries & installations, and a Super Admin Dashboard for centralized management and analytics.",
    tags: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Docker", "REST APIs"],
    codeLink: "https://github.com/magicworld092119-star/SmartBox.git",
    liveLinks: [
      { label: "Merchant App", url: "https://merqbox.vercel.app" },
      { label: "Agent App", url: "https://agentqbox.vercel.app" },
      { label: "Admin Console", url: "https://qboxcontrol.vercel.app" },
    ],
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce marketplace featuring secure JWT authentication, interactive product catalog, shopping cart state management, Stripe payment processing, and an intuitive customer order tracking dashboard.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS", "Stripe API"],
    codeLink: "https://github.com/yourusername/ecommerce-platform",
    liveLink: "https://ecommerce-demo.vercel.app",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative productivity workspace supporting Kanban boards, team workspaces, real-time push synchronization, priority filtering, and automated deadline reminders for seamless team workflow management.",
    tags: ["TypeScript", "React", "Firebase", "Firestore", "Tailwind CSS", "Zustand", "DnD Kit"],
    codeLink: "https://github.com/yourusername/task-app",
    liveLink: "https://task-app-demo.vercel.app",
  },
  {
    title: "Portfolio Website",
    description:
      "High-performance personal portfolio built with a futuristic cyberpunk neon aesthetic, interactive 3D WebGL particle simulations, smooth section transitions, and integrated EmailJS client contact automation.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Three.js", "OGL", "Vite", "EmailJS"],
    codeLink: "https://github.com/yourusername/portfolio",
    liveLink: "https://yourportfolio.vercel.app",
  },
  {
    title: "Weather Dashboard",
    description:
      "Dynamic meteorology dashboard delivering real-time weather analytics, UV index tracking, interactive 7-day temperature trends via Chart.js, geolocation auto-detection, and multi-city search history caching.",
    tags: ["JavaScript", "React", "OpenWeather API", "Chart.js", "Tailwind CSS", "HTML5 Geolocation"],
    codeLink: "https://github.com/yourusername/weather-dashboard",
    liveLink: "https://weather-dashboard-demo.vercel.app",
  },
  {
    title: "Social Media App",
    description:
      "Modern social networking application featuring instant media sharing, real-time comment threads, personalized feed algorithms, profile customization, and secure multi-user activity notifications.",
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Cloudinary", "REST API"],
    codeLink: "https://github.com/yourusername/social-app",
    liveLink: "https://social-app-demo.vercel.app",
  },
  {
    title: "Fitness Tracker",
    description:
      "Comprehensive fitness and wellness tracker empowering users to log workout routines, monitor daily calorie consumption, visualize weekly weight progress through interactive charts, and achieve milestone badges.",
    tags: ["React Native", "TypeScript", "Firebase", "Recharts", "Expo", "Context API"],
    codeLink: "https://github.com/yourusername/fitness-tracker",
    liveLink: "https://fitness-tracker-demo.vercel.app",
  },
];

export const Projects = () => {
  return (
    <section className="relative overflow-hidden py-12 min-h-[calc(100vh-8rem)] flex items-center bg-secondary/20">
      <Particles
        particleColors={["#ff0000", "#ffffff", "#ff4d4d"]}
        particleCount={250}
        particleSpread={8}
        speed={0.15}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-primary neon-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto neon-glow" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card/50 border-2 border-primary/20 hover:border-primary transition-all duration-300 hover-lift hover:neon-glow fade-in-up overflow-hidden flex flex-col h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Number Background */}
              <div className="h-44 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center shrink-0">
                <div className="text-6xl font-bold text-primary/20">
                  {index + 1}
                </div>
              </div>

              {/* Project Content */}
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </CardDescription>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/30 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons pinned to bottom */}
                <div className="space-y-2 pt-4 mt-auto">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`flex-1 border-primary/50 hover:border-primary hover:bg-primary/10 ${
                        !project.codeLink ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        project.codeLink && window.open(project.codeLink, "_blank", "noopener,noreferrer")
                      }
                      disabled={!project.codeLink}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.liveLink && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
                        onClick={() =>
                          window.open(project.liveLink, "_blank", "noopener,noreferrer")
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Button>
                    )}
                  </div>
                  {project.liveLinks && project.liveLinks.length > 0 && (
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {project.liveLinks.map((link, lIndex) => (
                        <Button
                          key={lIndex}
                          size="sm"
                          variant="outline"
                          className="text-xs px-1.5 py-1 h-8 border-primary/40 hover:border-primary hover:bg-primary/10 text-primary truncate"
                          onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
                          title={link.label}
                        >
                          <ExternalLink className="w-3 h-3 mr-1 shrink-0" />
                          <span className="truncate">{link.label}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
