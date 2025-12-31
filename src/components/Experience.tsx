import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'SAT Software House',
    period: 'Oct 2025 - Present',
    description: 'Working on full-stack development for Real Estate and Hire Expert projects, implementing user roles, property/job management, and dashboards.',
    current: true,
  },
  {
    title: 'Frontend Web Developer',
    company: 'Softosol',
    period: 'Jun 2025 - Aug 2025',
    description: 'Worked on real-world projects using HTML, CSS, JavaScript, and React. Collaborated with design teams to deliver pixel-perfect implementations.',
    current: false,
  },
  {
    title: 'Frontend Web Developer',
    company: 'Digital Empowerment Network',
    period: 'Jul 2025',
    description: 'Built a personal portfolio page and CRUD applications using HTML, CSS, JavaScript and React. Gained hands-on remote working experience.',
    current: false,
  },
];

function ExperienceCard3D({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
    >
      {/* Card */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-8' : 'md:pl-8'} perspective-1000`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group cursor-pointer"
        >
          {/* Glow */}
          <div 
            className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${experience.current ? 'bg-primary/30' : 'bg-secondary/20'}`}
            style={{ transform: "translateZ(-20px)" }}
          />
          
          {/* Shadow */}
          <div 
            className="absolute inset-4 bg-black/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
            style={{ transform: "translateZ(-30px) translateY(20px)" }}
          />
          
          {/* Main card */}
          <div 
            className={`relative bg-gradient-to-br from-card via-card to-muted/20 border rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 ${experience.current ? 'border-primary/40 group-hover:border-primary/60' : 'border-border/60 group-hover:border-primary/30'}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Current badge */}
            {experience.current && (
              <span 
                className="absolute -top-px left-6 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-b-lg shadow-lg"
                style={{ transform: "translateZ(40px)" }}
              >
                Current Role
              </span>
            )}
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>

            {/* Content */}
            <div className={`relative z-10 ${isLeft ? 'md:text-right' : 'md:text-left'}`} style={{ transform: "translateZ(50px)" }}>
              <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-inter font-medium text-primary">{experience.period}</span>
              </div>

              <h3 className="font-syne text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {experience.title}
              </h3>

              <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="font-inter text-muted-foreground font-medium">{experience.company}</span>
              </div>

              <p className="font-inter text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
          className={`relative w-6 h-6 rounded-full border-4 ${experience.current ? 'bg-primary border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.6)]' : 'bg-card border-border'}`}
        >
          {experience.current && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
          )}
        </motion.div>
      </div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-[100px]" />

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
            Career Journey
          </motion.span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-6">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            From learning to leading - my professional journey in web development
          </p>
        </motion.div>

        {/* Education Badge with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-20 perspective-1000"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card/80 backdrop-blur border border-border/60 rounded-2xl px-8 py-5 inline-flex items-center gap-5 group-hover:border-primary/40 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-syne font-bold text-foreground text-lg">BS in Computer Science</h4>
                <p className="font-inter text-sm text-muted-foreground">
                  International Islamic University Islamabad • 2019 - 2024
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
            <div className="w-full h-full bg-gradient-to-b from-primary/60 via-border to-border" />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard3D key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
