import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 92, category: 'Frontend' },
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 75, category: 'Backend' },
  { name: 'Express.js', level: 70, category: 'Backend' },
  { name: 'TypeScript', level: 70, category: 'Frontend' },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group perspective-1000"
    >
      <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] preserve-3d hover:translate-z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-syne text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </h3>
          <span className="text-sm font-inter text-primary font-semibold">
            {skill.level}%
          </span>
        </div>
        
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-glow"
            style={{ width: `${skill.level}%` }}
          />
        </div>

        <span className="inline-block mt-4 text-xs font-inter text-muted-foreground uppercase tracking-wider">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-inter text-sm tracking-widest uppercase">
            Expertise
          </span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Mastering the art of modern web development with cutting-edge tools and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="font-syne text-2xl font-semibold mb-6">Languages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Urdu', 'Pashto', 'English'].map((lang) => (
              <span
                key={lang}
                className="px-6 py-3 glass-card rounded-full font-inter text-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
