import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <a href="#" className="font-syne text-xl font-bold text-gradient">
            Jabir Khan
          </a>

          {/* Copyright */}
          <p className="font-inter text-sm text-muted-foreground flex items-center gap-1">
            © 2025 Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Jabir Khan
          </p>

          {/* Back to top */}
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top ↑
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
