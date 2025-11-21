import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface LearningTopicCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  onClick: () => void;
}

export function LearningTopicCard({ 
  title, 
  description, 
  icon: Icon, 
  difficulty,
  duration,
  onClick 
}: LearningTopicCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case "Principiante": return "bg-green-500/20 text-green-400";
      case "Intermedio": return "bg-yellow-500/20 text-yellow-400";
      case "Avanzado": return "bg-red-500/20 text-red-400";
      default: return "bg-purple-500/20 text-purple-400";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="h-full bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Icon className="h-8 w-8 text-purple-400" />
            </div>
            <Badge className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
          <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-purple-200">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-purple-300">⏱️ {duration}</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-purple-400 group-hover:text-purple-300"
            >
              Aprender más
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
