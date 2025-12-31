import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function Card3D({ children, className = '', glowColor = 'var(--primary)' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["150%", "-50%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["150%", "-50%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative ${className}`}
      >
        {/* Glow effect behind the card */}
        <motion.div 
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(${glowColor} / 0.4), transparent 70%)`,
          }}
        />
        
        {/* Card content */}
        <div 
          className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shine effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15), transparent 50%)`,
              left: shineX,
              top: shineY,
              width: "150%",
              height: "150%",
              transform: "translate(-25%, -25%)",
            }}
          />
          
          {/* Inner content with 3D depth */}
          <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
            {children}
          </div>
        </div>
        
        {/* Reflection/shadow at the bottom */}
        <div 
          className="absolute inset-x-4 -bottom-4 h-8 bg-gradient-to-t from-primary/10 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
}
