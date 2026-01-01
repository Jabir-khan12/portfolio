import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Phone, Download } from 'lucide-react';
import profileImage from '@/assets/profile-image.jpeg';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 hero-gradient z-10" />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-75" />
              <img
                src={profileImage}
                alt="Jabir Khan"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background"
              />
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-inter text-lg tracking-widest uppercase"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          >
            <span className="text-gradient glow-text">JABIR</span>
            <br />
            <span className="text-foreground">KHAN</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <p className="font-syne text-xl md:text-2xl text-muted-foreground">
              MERN Stack Developer
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-inter text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Building impactful web applications with{' '}
            <span className="text-primary">React</span>,{' '}
            <span className="text-secondary">Node.js</span>, and modern technologies.
            Transforming ideas into elegant digital experiences.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground"
          >
            <a
              href="mailto:jabirkhan6017@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>jabirkhan6017@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Islamabad, Pakistan</span>
            </span>
            <a
              href="tel:+92315993523"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+92 315 993523</span>
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-8"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 font-syne font-semibold text-primary-foreground bg-primary rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 font-syne font-semibold text-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
            >
              Get In Touch
            </a>
            <a
              href="/Jabir_Khan_Resume.pdf"
              download
              className="px-8 py-4 font-syne font-semibold text-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}