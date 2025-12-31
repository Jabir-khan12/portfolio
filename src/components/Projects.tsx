import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Real Estate Platform',
    description: 'Full-featured real estate platform enabling property listings, bookings, and seamless buyer-seller interactions with modern UI.',
    tags: ['React', 'Node.js', 'Database', 'Full Stack'],
    gradient: 'from-cyan-500/20 to-blue-600/20',
    accentColor: '185 100% 50%',
    icon: '🏠',
  },
  {
    title: 'Hire Expert',
    description: 'Professional services platform with user profiles, service listings, and comprehensive bookings management system.',
    tags: ['React', 'Express.js', 'MongoDB', 'REST API'],
    gradient: 'from-purple-500/20 to-pink-600/20',
    accentColor: '280 80% 60%',
    icon: '💼',
  },
  {
    title: 'Hospital Management System',
    description: 'React-based HMS with role-based authentication. Admins manage patients and recommendations while patients update profiles and view personalized care.',
    tags: ['React', 'Authentication', 'Dashboard', 'CRUD'],
    gradient: 'from-green-500/20 to-emerald-600/20',
    accentColor: '160 80% 45%',
    icon: '🏥',
  },
  {
    title: 'Figma to Code Clones',
    description: 'Pixel-perfect frontend implementations converting Figma designs into responsive, production-ready code.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    gradient: 'from-orange-500/20 to-red-600/20',
    accentColor: '25 100% 55%',
    icon: '🎨',
  },
];

function ProjectCard3D({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const translateZ = useTransform(mouseXSpring, [-0.5, 0, 0.5], ["-10px", "0px", "-10px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="perspective-1000 h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group cursor-pointer h-full"
      >
        {/* Glow effect */}
        <motion.div 
          className={`absolute -inset-2 bg-gradient-to-br ${project.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          style={{ transform: "translateZ(-40px)" }}
        />
        
        {/* Shadow */}
        <div 
          className="absolute inset-4 bg-black/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ transform: "translateZ(-30px) translateY(30px)" }}
        />
        
        {/* Main card */}
        <div 
          className="relative h-full bg-gradient-to-br from-card via-card to-muted/20 border border-border/60 rounded-3xl p-8 overflow-hidden group-hover:border-primary/30 transition-all duration-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(60px)" }}>
            {/* Icon with 3D pop */}
            <motion.div 
              className="text-5xl mb-6 w-fit"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="drop-shadow-2xl">{project.icon}</span>
            </motion.div>

            {/* Title */}
            <h3 
              className="font-syne text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
              style={{ transform: "translateZ(10px)" }}
            >
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
                  className="px-3 py-1.5 text-xs font-inter font-medium bg-muted/80 backdrop-blur rounded-lg text-muted-foreground border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <motion.div
              className="flex items-center gap-2 text-primary font-inter font-semibold group/link cursor-pointer w-fit"
              whileHover={{ x: 5 }}
              style={{ transform: "translateZ(30px)" }}
            >
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </motion.div>
          </div>
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
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border)/0.3)_1px,transparent_0)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_30%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary font-inter text-sm tracking-[0.3em] uppercase border border-primary/30 px-4 py-2 rounded-full"
          >
            Portfolio
          </motion.span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            A showcase of my work - from concept to deployment, each project represents growth and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard3D key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
