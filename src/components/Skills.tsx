import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'JavaScript', level: 95, category: 'Frontend', icon: '⚡' },
  { name: 'React', level: 95, category: 'Frontend', icon: '⚛️' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: '💨' },
  { name: 'Node.js', level: 90, category: 'Backend', icon: '🟢' },
  { name: 'Express.js', level: 90, category: 'Backend', icon: '🚂' },
  { name: 'MongoDB', level: 90, category: 'Database', icon: '🍃' },
];

function SkillCard3D({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);

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
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="perspective-1000"
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
        className="group cursor-pointer"
      >
        {/* Shadow layer */}
        <div 
          className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{ transform: "translateZ(-30px) translateY(20px)" }}
        />
        
        {/* Main card */}
        <div 
          className="relative bg-gradient-to-br from-card via-card to-muted/30 border border-border/60 rounded-2xl p-6 overflow-hidden group-hover:border-primary/40 transition-colors duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.08) 45%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 55%, transparent 60%)`,
              backgroundSize: "200% 100%",
              backgroundPositionX: shineX,
            }}
          />

          {/* Content layer - elevated */}
          <div style={{ transform: "translateZ(50px)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-syne text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
              <span className="text-sm font-inter font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {skill.level}%
              </span>
            </div>
            
            {/* Progress bar with 3D effect */}
            <div className="relative h-3 bg-muted/80 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1.2, delay: index * 0.08 + 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full shadow-lg"
              />
              {/* Highlight on top of progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1.2, delay: index * 0.08 + 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-white/30 to-transparent rounded-full"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-inter text-muted-foreground uppercase tracking-widest">
                {skill.category}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

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
            Expertise
          </motion.span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-6">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Mastering the art of modern web development with cutting-edge tools and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard3D key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="font-syne text-2xl font-semibold mb-8">Languages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['English', 'Urdu', 'Pashto'].map((lang, index) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-3 bg-card/80 backdrop-blur border border-border/50 rounded-full font-inter text-foreground hover:text-primary hover:border-primary/50 transition-all cursor-default shadow-lg"
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
