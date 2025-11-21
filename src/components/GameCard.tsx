import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  aiApplication: string;
  isAvailable: boolean;
  onPlay?: () => void;
}

export function GameCard({ 
  title, 
  description, 
  imageUrl, 
  aiApplication,
  isAvailable,
  onPlay 
}: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/20 group h-full">
        <div className="relative overflow-hidden aspect-video">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700">
            {aiApplication}
          </Badge>
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-white/90 px-4 py-2 rounded-full">Próximamente</span>
            </div>
          )}
        </div>
      
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      
        <CardFooter>
          {isAvailable ? (
            <Button className="w-full" size="lg">
            <Link to="/Home" className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Jugar Ahora
            </Link>
            </Button>
          ) : (
            <Button disabled className="w-full" size="lg">
              <Lock className="mr-2 h-4 w-4" />
              Próximamente
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}