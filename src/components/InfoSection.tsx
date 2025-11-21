import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface InfoSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  reverse?: boolean;
}

export function InfoSection({ title, description, imageUrl, icon: Icon, reverse = false }: InfoSectionProps) {
  return (
    <motion.div 
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Icon className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-white">{title}</h3>
        </div>
        <p className="text-purple-200 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="flex-1 w-full">
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
