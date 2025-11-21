import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowLeft, CheckCircle2, LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface LearningContent {
  id: string;
  title: string;
  icon: LucideIcon;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  introduction: string;
  imageUrl?: string;
  sections: {
    title: string;
    content: string;
    keyPoints?: string[];
  }[];
  summary: string;
  nextSteps?: string[];
}

interface LearningPageProps {
  content: LearningContent;
  onBack: () => void;
}

export function LearningPage({ content, onBack }: LearningPageProps) {
  const Icon = content.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-purple-300 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a temas
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-purple-500/20 rounded-xl">
              <Icon className="h-12 w-12 text-purple-400" />
            </div>
            <div>
              <h1 className="text-white mb-2">{content.title}</h1>
              <div className="flex gap-3 text-purple-300">
                <span>📚 {content.difficulty}</span>
                <span>⏱️ {content.duration}</span>
              </div>
            </div>
          </div>
          <p className="text-purple-200 max-w-3xl">
            {content.introduction}
          </p>
        </motion.div>

        {/* Image */}
        {content.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <ImageWithFallback
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <h3 className="text-white mb-4">{section.title}</h3>
                  <p className="text-purple-200 mb-4 leading-relaxed">
                    {section.content}
                  </p>
                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-purple-300">Puntos clave:</p>
                      <ul className="space-y-2">
                        {section.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-purple-200">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-purple-500/10 backdrop-blur-sm border-purple-500/30 mb-8">
            <CardContent className="p-6">
              <h3 className="text-white mb-4">📝 Resumen</h3>
              <p className="text-purple-200 leading-relaxed">
                {content.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        {content.nextSteps && content.nextSteps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-white mb-4">🚀 Próximos pasos</h3>
                <ul className="space-y-2">
                  {content.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-purple-200">
                      <span className="text-purple-400 mt-1">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button
            onClick={onBack}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Explorar más temas
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
