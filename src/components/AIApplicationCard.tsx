import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface AIApplicationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
}

export function AIApplicationCard({ title, description, icon: Icon, examples }: AIApplicationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Icon className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle className="text-white">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-200">{description}</p>
          <div>
            <p className="text-purple-300 mb-2">Ejemplos de uso:</p>
            <ul className="space-y-1">
              {examples.map((example, index) => (
                <li key={index} className="text-purple-200 flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
