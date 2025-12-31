import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

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

function TimelineItem({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`glass-card rounded-2xl p-6 md:p-8 relative group hover:border-primary/50 transition-all duration-500 ${experience.current ? 'border-primary/30' : ''}`}
        >
          {experience.current && (
            <span className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              Current
            </span>
          )}
          
          <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-inter text-primary">{experience.period}</span>
          </div>

          <h3 className="font-syne text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {experience.title}
          </h3>

          <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span className="font-inter text-muted-foreground">{experience.company}</span>
          </div>

          <p className="font-inter text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
          className={`w-5 h-5 rounded-full border-4 ${experience.current ? 'bg-primary border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.5)]' : 'bg-card border-border'}`}
        />
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
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-inter text-sm tracking-widest uppercase">
            Career Journey
          </span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            From learning to leading - my professional journey in web development
          </p>
        </motion.div>

        {/* Education Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="glass-card rounded-2xl px-8 py-4 inline-flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="text-left">
              <h4 className="font-syne font-semibold text-foreground">BS in Computer Science</h4>
              <p className="font-inter text-sm text-muted-foreground">
                International Islamic University Islamabad • 2019 - 2024
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <TimelineItem key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
