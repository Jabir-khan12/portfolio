import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Linkedin, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jabirkhan6017@gmail.com',
    href: 'mailto:jabirkhan6017@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 315 993523',
    href: 'tel:+923159935233',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
  },
];

function ContactCard3D({ info, index }: { info: typeof contactInfo[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group cursor-pointer perspective-1000"
    >
      <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div 
        className="relative flex items-center gap-4 bg-card/80 backdrop-blur border border-border/60 rounded-2xl p-5 group-hover:border-primary/40 transition-all duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
          style={{ transform: "translateZ(30px)" }}
        >
          <info.icon className="w-5 h-5 text-primary" />
        </div>
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="font-inter text-sm text-muted-foreground">{info.label}</p>
          <p className="font-syne font-semibold text-foreground group-hover:text-primary transition-colors">
            {info.value}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {info.href ? <a href={info.href}>{Content}</a> : Content}
    </motion.div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const headerRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleFormMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-[100px]" />

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
            Get In Touch
          </motion.span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold mt-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="font-inter text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <ContactCard3D key={info.label} info={info} index={index} />
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card/80 backdrop-blur border border-border/60 rounded-2xl p-6 text-center mt-8"
            >
              <p className="font-inter text-muted-foreground mb-5">
                Open for opportunities and collaborations
              </p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/jabir-khan-b9a54024b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center cursor-pointer hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
                <motion.a
                  href="https://github.com/Jabir-khan12"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center cursor-pointer hover:bg-primary/20 border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="perspective-1000"
          >
            <motion.div
              ref={formRef}
              onMouseMove={handleFormMouseMove}
              onMouseLeave={handleFormMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="group"
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
              
              <form 
                onSubmit={handleSubmit} 
                className="relative bg-card/80 backdrop-blur border border-border/60 rounded-3xl p-8 space-y-6 group-hover:border-primary/30 transition-colors"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(40px)" }}>
                  <label className="block font-inter text-sm text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-xl font-inter text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div style={{ transform: "translateZ(40px)" }}>
                  <label className="block font-inter text-sm text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-xl font-inter text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div style={{ transform: "translateZ(40px)" }}>
                  <label className="block font-inter text-sm text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-xl font-inter text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary text-primary-foreground font-syne font-bold rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-all"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
