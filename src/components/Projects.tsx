import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Real Estate Platform',
    description: 'Full-featured real estate platform enabling property listings, bookings, and seamless buyer-seller interactions with modern UI.',
    tags: ['React', 'Node.js', 'Database', 'Full Stack'],
    color: 'from-cyan-500 to-blue-600',
    icon: '🏠',
  },
  {
    title: 'Hire Expert',
    description: 'Professional services platform with user profiles, service listings, and comprehensive bookings management system.',
    tags: ['React', 'Express.js', 'MongoDB', 'REST API'],
    color: 'from-purple-500 to-pink-600',
    icon: '💼',
  },
  {
    title: 'Hospital Management System',
    description: 'React-based HMS with role-based authentication. Admins manage patients and recommendations while patients update profiles and view personalized care.',
    tags: ['React', 'Authentication', 'Dashboard', 'CRUD'],
    color: 'from-green-500 to-emerald-600',
    icon: '🏥',
  },
  {
    title: 'Figma to Code Clones',
    description: 'Pixel-perfect frontend implementations converting Figma designs into responsive, production-ready code.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: 'from-orange-500 to-red-600',
    icon: '🎨',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full"
      >
        {/* Glow effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
        
        <div className="relative glass-card rounded-3xl p-8 h-full flex flex-col group-hover:border-primary/30 transition-all duration-500">
          {/* Icon */}
          <div className="text-5xl mb-6">{project.icon}</div>

          {/* Title */}
          <h3 className="font-syne text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-gradient transition-all">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-inter text-muted-foreground leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-inter font-medium bg-muted rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
            className="flex items-center gap-2 text-primary font-inter font-medium group/link cursor-pointer"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-inter text-sm tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            A showcase of my work - from concept to deployment, each project represents growth and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
