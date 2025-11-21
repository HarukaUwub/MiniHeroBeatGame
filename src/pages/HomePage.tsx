import { GameCard } from "../components/GameCard";
import { InfoSection } from "../components/InfoSection";
import { AIApplicationCard } from "../components/AIApplicationCard";
import { LearningTopicCard } from "../components/LearningTopicCard";
import { LearningPage, LearningContent } from "../components/LearningPage";
import { Brain, Sparkles, Lightbulb, Cpu, Network, Camera, MessageSquare, Headphones, FileText, BookOpen, Gamepad2, Database, Zap, TrendingUp, Shield } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";

export default function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedLearningTopic, setSelectedLearningTopic] = useState<string | null>(null);

  const games = [
    {
      id: "pose-detection",
      title: "Imita la Pose",
      description: "Usa tu cámara para imitar diferentes poses y descubre cómo la IA detecta tu postura en tiempo real.",
      imageUrl: "https://images.unsplash.com/photo-1667890786022-83bca6c4f4c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3NlJTIwZGV0ZWN0aW9uJTIweG9nYXxlbnwxfHx8fDE3NjM2NzY5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Detección de Poses",
      isAvailable: true,
    },
    {
      id: "face-recognition",
      title: "Reconocimiento Facial",
      description: "Explora cómo la IA identifica y analiza rasgos faciales para reconocer emociones y características únicas.",
      imageUrl: "https://images.unsplash.com/photo-1639478411016-726027171e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjByZWNvZ25pdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNTYwODI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Visión por Computadora",
      isAvailable: false,
    },
    {
      id: "object-detection",
      title: "Detecta Objetos",
      description: "Aprende cómo la IA puede identificar y clasificar múltiples objetos en imágenes y videos en tiempo real.",
      imageUrl: "https://images.unsplash.com/photo-1567617372862-b2a4d58067bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYmplY3QlMjBkZXRlY3Rpb24lMjBBSXxlbnwxfHx8fDE3NjM2NzY5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Detección de Objetos",
      isAvailable: false,
    },
    {
      id: "voice-recognition",
      title: "Reconocimiento de Voz",
      description: "Descubre cómo la IA convierte tu voz en texto y puede entender comandos hablados en diferentes idiomas.",
      imageUrl: "https://images.unsplash.com/photo-1615793927044-600a1ec42466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2ljZSUyMHJlY29nbml0aW9uJTIwc291bmQlMjB3YXZlc3xlbnwxfHx8fDE3NjM2NzY5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Procesamiento de Audio",
      isAvailable: false,
    },
    {
      id: "text-analysis",
      title: "Análisis de Sentimientos",
      description: "Experimenta cómo la IA puede analizar texto para determinar emociones, temas y sentimientos expresados.",
      imageUrl: "https://images.unsplash.com/photo-1759503497905-8b04db30ee80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0JTIwYW5hbHlzaXMlMjB3cml0aW5nfGVufDF8fHx8MTc2MzY3Njk5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Procesamiento de Lenguaje",
      isAvailable: false,
    },
    {
      id: "gesture-control",
      title: "Control por Gestos",
      description: "Controla aplicaciones usando solo tus manos. Aprende cómo la IA interpreta movimientos y gestos naturales.",
      imageUrl: "https://images.unsplash.com/photo-1758526213714-a0743a6c101f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXN0dXJlJTIwY29udHJvbCUyMGhhbmR8ZW58MXx8fHwxNzYzNjc2OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      aiApplication: "Reconocimiento de Gestos",
      isAvailable: false,
    },
  ];

  const aiApplications = [
    {
      title: "Visión por Computadora",
      description: "La IA puede 'ver' e interpretar imágenes y videos, identificando objetos, rostros y patrones visuales.",
      icon: Camera,
      examples: [
        "Reconocimiento facial en smartphones",
        "Detección de objetos en vehículos autónomos",
        "Diagnóstico médico por imagen"
      ]
    },
    {
      title: "Procesamiento de Lenguaje Natural",
      description: "Permite a las máquinas entender, interpretar y generar lenguaje humano de manera natural.",
      icon: MessageSquare,
      examples: [
        "Asistentes virtuales como Siri o Alexa",
        "Traducción automática de idiomas",
        "Chatbots de atención al cliente"
      ]
    },
    {
      title: "Reconocimiento de Audio",
      description: "La IA puede analizar y comprender sonidos, desde voz humana hasta música y ruidos ambientales.",
      icon: Headphones,
      examples: [
        "Transcripción automática de reuniones",
        "Identificación de canciones (Shazam)",
        "Comandos de voz en dispositivos"
      ]
    },
    {
      title: "Aprendizaje Profundo",
      description: "Redes neuronales que aprenden de grandes cantidades de datos para resolver problemas complejos.",
      icon: Network,
      examples: [
        "Recomendaciones personalizadas en Netflix",
        "Predicción del clima",
        "Análisis de comportamiento del usuario"
      ]
    }
  ];

  const learningTopics = [
    {
      id: "machine-learning",
      title: "Aprendizaje Automático",
      description: "La IA aprende de los datos sin ser programada explícitamente. Cuantos más datos procesa, mejor se vuelve en sus predicciones y decisiones. Es como cuando aprendes a andar en bicicleta: al principio necesitas ayuda, pero con práctica lo haces automáticamente.",
      imageUrl: "https://images.unsplash.com/photo-1717501219604-cc1902b5d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXR3b3JrfGVufDF8fHx8MTc2MzY3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Cpu
    },
    {
      id: "neural-networks",
      title: "Redes Neuronales",
      description: "Inspiradas en el cerebro humano, las redes neuronales artificiales son sistemas de nodos interconectados que procesan información. Cada conexión aprende a reconocer patrones específicos, permitiendo a la IA realizar tareas complejas como reconocer rostros o entender lenguaje.",
      imageUrl: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwY2lyY3VpdHxlbnwxfHx8fDE3NjM2NzcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Network,
      reverse: true
    },
    {
      id: "real-world-applications",
      title: "Aplicaciones del Mundo Real",
      description: "La IA está en todas partes: desde los filtros de spam en tu correo hasta las recomendaciones de películas en Netflix. Los asistentes de voz, los autos autónomos, el diagnóstico médico y hasta los videojuegos usan IA para funcionar mejor y adaptarse a tus necesidades.",
      imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW58ZW58MXx8fHwxNzYzNjc1MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Lightbulb
    }
  ];

  const learningContents: LearningContent[] = [
    {
      id: "machine-learning",
      title: "Aprendizaje Automático",
      icon: Cpu,
      difficulty: "Principiante",
      duration: "15-20 min",
      introduction: "El Aprendizaje Automático es una rama de la IA que permite a las computadoras aprender y mejorar sin ser programadas explícitamente para cada tarea. Descubre cómo funciona esta tecnología revolucionaria.",
      imageUrl: "https://images.unsplash.com/photo-1717501219604-cc1902b5d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXR3b3JrfGVufDF8fHx8MTc2MzY3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "¿Qué es el Aprendizaje Automático?",
          content: "El Aprendizaje Automático (Machine Learning) es el proceso mediante el cual las computadoras aprenden de la experiencia. En lugar de seguir instrucciones específicas programadas por humanos, los sistemas de ML analizan grandes cantidades de datos, identifican patrones y toman decisiones basadas en esos patrones. Es similar a cómo aprendemos los humanos: mediante la experiencia y la repetición.",
          keyPoints: [
            "Aprende automáticamente de los datos sin programación explícita",
            "Mejora su rendimiento con más experiencia y datos",
            "Identifica patrones que serían difíciles de programar manualmente",
            "Se adapta a nuevas situaciones basándose en su aprendizaje previo"
          ]
        },
        {
          title: "Tipos de Aprendizaje Automático",
          content: "Existen tres tipos principales de aprendizaje automático, cada uno adecuado para diferentes problemas y situaciones.",
          keyPoints: [
            "Aprendizaje Supervisado: Aprende de ejemplos etiquetados (como clasificar emails como spam o no spam)",
            "Aprendizaje No Supervisado: Encuentra patrones en datos sin etiquetas (como agrupar clientes similares)",
            "Aprendizaje por Refuerzo: Aprende mediante prueba y error con recompensas (como entrenar un robot a caminar)"
          ]
        },
        {
          title: "Aplicaciones Prácticas",
          content: "El Aprendizaje Automático está presente en muchas tecnologías que usamos diariamente. Cada vez que Netflix te recomienda una película, cuando tu banco detecta un fraude, o cuando tu teléfono reconoce tu cara, el ML está trabajando.",
          keyPoints: [
            "Sistemas de recomendación en plataformas de streaming y e-commerce",
            "Detección de fraude en transacciones bancarias",
            "Reconocimiento facial en smartphones",
            "Predicción de tráfico en aplicaciones de mapas",
            "Filtros de spam en correo electrónico"
          ]
        }
      ],
      summary: "El Aprendizaje Automático es la capacidad de las computadoras para aprender de los datos y mejorar su rendimiento con el tiempo. Mediante diferentes enfoques como el aprendizaje supervisado, no supervisado y por refuerzo, los sistemas de ML pueden resolver problemas complejos y adaptarse a nuevas situaciones. Esta tecnología ya está transformando nuestra vida cotidiana en formas visibles e invisibles.",
      nextSteps: [
        "Explora las Redes Neuronales para entender el Aprendizaje Profundo",
        "Prueba nuestros juegos interactivos para ver el ML en acción",
        "Aprende sobre las diferentes aplicaciones de la IA en el mundo real"
      ]
    },
    {
      id: "neural-networks",
      title: "Redes Neuronales",
      icon: Network,
      difficulty: "Intermedio",
      duration: "20-25 min",
      introduction: "Las redes neuronales son el cerebro detrás del Aprendizaje Profundo. Inspiradas en cómo funciona el cerebro humano, estas redes pueden reconocer patrones complejos y resolver problemas que antes parecían imposibles para las máquinas.",
      imageUrl: "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwY2lyY3VpdHxlbnwxfHx8fDE3NjM2NzcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "Inspiración Biológica",
          content: "Las redes neuronales artificiales se inspiran en el cerebro humano. Al igual que nuestro cerebro tiene miles de millones de neuronas conectadas que se activan y transmiten señales, las redes neuronales artificiales tienen nodos (neuronas artificiales) conectados entre sí. Cada conexión tiene un 'peso' que determina qué tan importante es esa señal.",
          keyPoints: [
            "Imitan la estructura del cerebro humano con neuronas artificiales",
            "Las conexiones entre neuronas tienen pesos que se ajustan durante el aprendizaje",
            "Procesan información en capas, desde simples a complejas",
            "Pueden aprender representaciones abstractas de los datos"
          ]
        },
        {
          title: "Arquitectura de las Redes",
          content: "Una red neuronal típica está organizada en capas: una capa de entrada que recibe los datos, varias capas ocultas que procesan la información, y una capa de salida que produce el resultado. Las redes más profundas (con más capas) pueden aprender patrones más complejos.",
          keyPoints: [
            "Capa de entrada: Recibe los datos originales",
            "Capas ocultas: Procesan y transforman la información",
            "Capa de salida: Produce el resultado final",
            "Redes más profundas = patrones más complejos"
          ]
        },
        {
          title: "Aplicaciones Revolucionarias",
          content: "Las redes neuronales han revolucionado campos como la visión por computadora, el procesamiento de lenguaje natural y el reconocimiento de voz. Permiten que los autos se conduzcan solos, que los asistentes virtuales entiendan lo que dices, y que las aplicaciones puedan reconocer objetos en fotos.",
          keyPoints: [
            "Reconocimiento de imágenes con precisión humana",
            "Traducción automática de idiomas en tiempo real",
            "Generación de texto, imágenes y música",
            "Diagnóstico médico asistido por IA",
            "Conducción autónoma en vehículos"
          ]
        }
      ],
      summary: "Las redes neuronales son sistemas de aprendizaje inspirados en el cerebro humano, compuestos por capas de neuronas artificiales interconectadas. Mediante el ajuste de los pesos de sus conexiones, aprenden a reconocer patrones complejos y resolver problemas difíciles. Son la base del Aprendizaje Profundo y están detrás de muchos avances recientes en IA.",
      nextSteps: [
        "Explora cómo las redes convolucionales procesan imágenes",
        "Aprende sobre redes recurrentes y procesamiento de secuencias",
        "Prueba los juegos de detección de objetos y reconocimiento facial"
      ]
    },
    {
      id: "real-world-applications",
      title: "Aplicaciones del Mundo Real",
      icon: Lightbulb,
      difficulty: "Principiante",
      duration: "10-15 min",
      introduction: "La IA ya no es ciencia ficción: está en todos lados, desde tu smartphone hasta tu casa inteligente. Descubre cómo la IA está transformando industrias y mejorando nuestra vida diaria de formas que quizás no imaginabas.",
      imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW58ZW58MXx8fHwxNzYzNjc1MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "IA en tu Bolsillo",
          content: "Tu smartphone está lleno de IA. Desde el reconocimiento facial que desbloquea tu teléfono hasta los asistentes virtuales que responden tus preguntas, la IA hace que tu dispositivo sea más inteligente cada día. Las cámaras usan IA para mejorar tus fotos, detectar sonrisas, y aplicar filtros en tiempo real.",
          keyPoints: [
            "Reconocimiento facial para desbloqueo seguro",
            "Asistentes virtuales como Siri, Google Assistant y Alexa",
            "Mejora automática de fotos y videos",
            "Predicción de texto y corrección automática",
            "Traducción instantánea de idiomas"
          ]
        },
        {
          title: "IA en Salud y Medicina",
          content: "La IA está revolucionando la medicina. Puede analizar radiografías y resonancias magnéticas para detectar enfermedades más temprano que los humanos, descubrir nuevos medicamentos, y personalizar tratamientos para cada paciente. Los chatbots médicos pueden dar consejos preliminares 24/7.",
          keyPoints: [
            "Detección temprana de cáncer en imágenes médicas",
            "Desarrollo acelerado de nuevos medicamentos",
            "Monitoreo continuo de pacientes con dispositivos inteligentes",
            "Cirugías asistidas por robots con mayor precisión",
            "Diagnóstico rápido mediante análisis de síntomas"
          ]
        },
        {
          title: "IA en Transporte y Movilidad",
          content: "Los vehículos autónomos usan IA para 'ver' el camino, predecir el comportamiento de otros conductores y tomar decisiones en milisegundos. Las aplicaciones de mapas usan IA para predecir el tráfico y sugerirte la mejor ruta. El transporte público se optimiza con IA para reducir tiempos de espera.",
          keyPoints: [
            "Vehículos autónomos que conducen sin intervención humana",
            "Optimización de rutas en tiempo real",
            "Predicción de tráfico y tiempos de viaje",
            "Sistemas de estacionamiento inteligente",
            "Mantenimiento predictivo en vehículos"
          ]
        },
        {
          title: "IA en Entretenimiento",
          content: "Netflix, Spotify y YouTube usan IA para recomendarte contenido que te gustará. Los videojuegos crean personajes más realistas con comportamientos impredecibles. La IA puede generar música, arte e incluso guiones de películas. El entretenimiento personalizado es posible gracias a la IA.",
          keyPoints: [
            "Sistemas de recomendación personalizados",
            "NPCs inteligentes en videojuegos",
            "Generación de música y arte",
            "Mejora de calidad de video en streaming",
            "Creación de efectos especiales en películas"
          ]
        }
      ],
      summary: "La IA está presente en prácticamente todos los aspectos de nuestra vida moderna. Desde la salud y el transporte hasta el entretenimiento y la comunicación, la IA mejora servicios, aumenta la eficiencia y crea experiencias más personalizadas. A medida que la tecnología avanza, veremos aún más aplicaciones innovadoras que transformarán cómo vivimos, trabajamos y nos divertimos.",
      nextSteps: [
        "Descubre más sobre Visión por Computadora y sus aplicaciones",
        "Explora el Procesamiento de Lenguaje Natural",
        "Prueba nuestros juegos para experimentar la IA en acción"
      ]
    },
    {
      id: "data-training",
      title: "Datos y Entrenamiento",
      icon: Database,
      difficulty: "Intermedio",
      duration: "15-20 min",
      introduction: "Los datos son el combustible de la IA. Sin datos de calidad, incluso los mejores algoritmos fallarán. Aprende cómo se entrenan los modelos de IA y por qué los datos son tan importantes.",
      imageUrl: "https://images.unsplash.com/photo-1542725752-e9f7259b3881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBsZWFybmluZyUyMGJvb2tzfGVufDF8fHx8MTc2MzYzMzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "La Importancia de los Datos",
          content: "Los modelos de IA aprenden de ejemplos, por lo que necesitan grandes cantidades de datos de calidad. Datos incorrectos o sesgados producirán modelos incorrectos o sesgados. Es como aprender a cocinar: si solo aprendes con recetas de pizza, no sabrás hacer sushi.",
          keyPoints: [
            "Cantidad: Más datos generalmente = mejores modelos",
            "Calidad: Datos limpios y precisos son cruciales",
            "Diversidad: Datos variados evitan sesgos",
            "Relevancia: Los datos deben ser representativos del problema"
          ]
        },
        {
          title: "El Proceso de Entrenamiento",
          content: "Entrenar un modelo de IA es un proceso iterativo. El modelo hace predicciones, se comparan con la realidad, y se ajustan sus parámetros para mejorar. Este proceso se repite miles o millones de veces hasta que el modelo alcanza un nivel de precisión aceptable.",
          keyPoints: [
            "Alimentar datos al modelo",
            "El modelo hace predicciones",
            "Calcular el error de las predicciones",
            "Ajustar parámetros para reducir el error",
            "Repetir hasta lograr la precisión deseada"
          ]
        },
        {
          title: "Desaf��os y Consideraciones",
          content: "El entrenamiento de IA tiene desafíos importantes. Requiere mucha computación y energía. Los datos pueden contener sesgos que el modelo aprenderá. Es crucial validar que el modelo funcione bien con datos nuevos, no solo con los de entrenamiento.",
          keyPoints: [
            "Alto costo computacional y energético",
            "Riesgo de sobreajuste (memorizar en lugar de aprender)",
            "Sesgos en los datos pueden perpetuarse",
            "Necesidad de datos de validación independientes",
            "Consideraciones éticas sobre privacidad de datos"
          ]
        }
      ],
      summary: "Los datos de calidad son esenciales para entrenar modelos de IA efectivos. El proceso de entrenamiento es iterativo y requiere recursos computacionales significativos. Es fundamental considerar la calidad, cantidad y diversidad de los datos, así como los desafíos éticos y técnicos asociados con el entrenamiento de IA.",
      nextSteps: [
        "Aprende sobre la ética en IA y sesgos algorítmicos",
        "Explora cómo funcionan las Redes Neuronales",
        "Descubre técnicas avanzadas de optimización"
      ]
    },
    {
      id: "ai-ethics",
      title: "Ética en la IA",
      icon: Shield,
      difficulty: "Intermedio",
      duration: "20-25 min",
      introduction: "Con gran poder viene gran responsabilidad. La IA puede hacer mucho bien, pero también plantea desafíos éticos importantes. Aprende sobre privacidad, sesgos, y cómo crear IA responsable.",
      imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW58ZW58MXx8fHwxNzYzNjc1MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "Privacidad y Datos Personales",
          content: "La IA necesita datos para funcionar, pero esos datos a menudo incluyen información personal. ¿Cómo equilibramos el progreso tecnológico con el derecho a la privacidad? Es esencial ser transparentes sobre qué datos se recopilan y cómo se usan.",
          keyPoints: [
            "Recopilación mínima: Solo los datos necesarios",
            "Consentimiento informado de los usuarios",
            "Anonimización cuando sea posible",
            "Seguridad robusta para proteger datos",
            "Derecho al olvido y control de datos personales"
          ]
        },
        {
          title: "Sesgos y Discriminación",
          content: "Los modelos de IA aprenden de datos históricos que pueden contener sesgos sociales. Si no se manejan cuidadosamente, estos sesgos se perpetúan y amplifican. Por ejemplo, sistemas de contratación que discriminan por género o algoritmos de préstamos que discriminan por raza.",
          keyPoints: [
            "Los sesgos en datos se reflejan en los modelos",
            "Pueden perpetuar discriminación histórica",
            "Afectan decisiones importantes (empleo, créditos, justicia)",
            "Requieren auditorías y correcciones constantes",
            "Necesidad de equipos diversos en desarrollo de IA"
          ]
        },
        {
          title: "Transparencia y Explicabilidad",
          content: "Muchos modelos de IA son 'cajas negras': funcionan bien pero no sabemos por qué toman ciertas decisiones. Cuando la IA toma decisiones que afectan vidas humanas, necesitamos entender el razonamiento detrás de esas decisiones.",
          keyPoints: [
            "Derecho a explicación de decisiones automatizadas",
            "IA interpretable vs. IA de caja negra",
            "Importancia en áreas críticas (medicina, justicia)",
            "Balance entre precisión y explicabilidad",
            "Documentación clara de limitaciones del modelo"
          ]
        },
        {
          title: "Impacto Social y Laboral",
          content: "La IA está automatizando trabajos y cambiando el mercado laboral. Algunos empleos desaparecerán, otros se transformarán, y surgirán nuevos. Como sociedad, debemos prepararnos para esta transición y asegurar que los beneficios de la IA se distribuyan equitativamente.",
          keyPoints: [
            "Automatización de tareas repetitivas",
            "Necesidad de recualificación profesional",
            "Creación de nuevos tipos de empleos",
            "Riesgo de aumento en desigualdad económica",
            "Importancia de políticas públicas adaptativas"
          ]
        }
      ],
      summary: "La ética en IA es fundamental para un desarrollo tecnológico responsable. Debemos abordar desafíos de privacidad, combatir sesgos, asegurar transparencia en las decisiones, y prepararnos para los impactos sociales. El objetivo es crear IA que beneficie a toda la humanidad mientras protegemos derechos fundamentales y valores sociales.",
      nextSteps: [
        "Reflexiona sobre el impacto de la IA en tu vida diaria",
        "Investiga marcos de IA responsable y regulaciones",
        "Únete a conversaciones sobre el futuro de la IA en sociedad"
      ]
    },
    {
      id: "future-ai",
      title: "El Futuro de la IA",
      icon: TrendingUp,
      difficulty: "Avanzado",
      duration: "25-30 min",
      introduction: "¿Hacia dónde se dirige la IA? Desde la IA general hasta la computación cuántica, explora las tendencias emergentes que definirán el futuro de esta tecnología y su impacto en la humanidad.",
      imageUrl: "https://images.unsplash.com/photo-1717501219604-cc1902b5d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXR3b3JrfGVufDF8fHx8MTc2MzY3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      sections: [
        {
          title: "De IA Estrecha a IA General",
          content: "Hoy en día tenemos IA estrecha: sistemas excelentes en tareas específicas pero incapaces de transferir ese conocimiento a otros dominios. La IA General (AGI) sería capaz de entender, aprender y aplicar inteligencia a cualquier problema, como lo hacen los humanos. Aunque no existe aún, muchos investigadores trabajan hacia este objetivo.",
          keyPoints: [
            "IA actual: Especializada en tareas específicas",
            "AGI: Inteligencia versátil y transferible",
            "Desafíos técnicos enormes aún por resolver",
            "Potencial para revolucionar completamente la sociedad",
            "Debates sobre tiempo y factibilidad"
          ]
        },
        {
          title: "IA Cuántica",
          content: "La computación cuántica podría acelerar enormemente ciertos tipos de cálculos de IA. Mientras las computadoras tradicionales procesan bits (0 o 1), las computadoras cuánticas usan qubits que pueden estar en múltiples estados simultáneamente. Esto podría revolucionar el entrenamiento de modelos complejos.",
          keyPoints: [
            "Aceleración exponencial de ciertos cálculos",
            "Potencial para modelos mucho más complejos",
            "Aún en etapas tempranas de desarrollo",
            "Combinación de IA y física cuántica",
            "Nuevos algoritmos específicos para hardware cuántico"
          ]
        },
        {
          title: "IA Aumentada y Simbiótica",
          content: "El futuro no es humanos vs. máquinas, sino humanos + máquinas. La IA aumentada amplifica las capacidades humanas en lugar de reemplazarlas. Interfaces cerebro-computadora, realidad aumentada con IA, y asistentes inteligentes trabajarán en simbiosis con nosotros.",
          keyPoints: [
            "Colaboración humano-IA en lugar de reemplazo",
            "Interfaces cerebro-computadora avanzadas",
            "RA/RV potenciada con IA en tiempo real",
            "Asistentes personalizados que anticipan necesidades",
            "Expansión de capacidades cognitivas humanas"
          ]
        },
        {
          title: "Desafíos y Oportunidades",
          content: "El futuro de la IA trae promesas increíbles pero también desafíos significativos. Desde resolver el cambio climático hasta curar enfermedades, la IA podría ayudarnos con los mayores problemas de la humanidad. Pero también debemos asegurarnos de que se desarrolle de forma segura, ética y beneficiosa para todos.",
          keyPoints: [
            "Solución de problemas globales (clima, salud, energía)",
            "Necesidad de gobernanza y regulación internacional",
            "Riesgos existenciales y seguridad de la IA",
            "Democratización del acceso a la IA",
            "Educación y preparación social para la era de la IA"
          ]
        }
      ],
      summary: "El futuro de la IA es tanto emocionante como incierto. Desde la búsqueda de la IA General hasta la integración de computación cuántica y la simbiosis humano-máquina, estamos al borde de avances transformadores. El desafío es guiar este desarrollo de manera que maximice los beneficios para la humanidad mientras minimizamos los riesgos. Todos tenemos un papel en dar forma a este futuro.",
      nextSteps: [
        "Mantente informado sobre avances en IA",
        "Participa en discusiones sobre el futuro que queremos",
        "Considera cómo la IA podría impactar tu campo de interés"
      ]
    }
  ];

  const handlePlayGame = (gameId: string) => {
    setSelectedGame(gameId);
    alert(`Iniciando juego: ${gameId}`);
  };

  const handleSelectLearningTopic = (topicId: string) => {
    setSelectedLearningTopic(topicId);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Si hay un tema seleccionado, mostrar la página de aprendizaje
  if (selectedLearningTopic) {
    const content = learningContents.find(c => c.id === selectedLearningTopic);
    if (content) {
      return <LearningPage content={content} onBack={() => setSelectedLearningTopic(null)} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-white">AI GameSpot</span>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('info')}
                className="text-purple-200 hover:text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Información
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('games')}
                className="text-purple-200 hover:text-white"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Juegos
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-20 space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-16 w-16 text-purple-400" />
            </motion.div>
            <h1 className="text-white flex items-center gap-2">
              AI GameSpot
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-10 w-10 text-yellow-400" />
              </motion.div>
            </h1>
          </div>
          <p className="text-purple-200 max-w-3xl mx-auto">
            Explora el fascinante mundo de la Inteligencia Artificial. Aprende cómo funciona la IA, 
            descubre sus aplicaciones en la vida real y experimenta con juegos interactivos educativos.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              size="lg"
              onClick={() => scrollToSection('info')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Lightbulb className="mr-2 h-5 w-5" />
              Aprender sobre IA
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('games')}
              className="border-purple-500 text-purple-200 hover:bg-purple-500/20"
            >
              <Gamepad2 className="mr-2 h-5 w-5" />
              Jugar Ahora
            </Button>
          </div>
        </motion.div>

        {/* What is AI Section */}
        <section id="info" className="mb-20 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">¿Qué es la Inteligencia Artificial?</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              La Inteligencia Artificial es la capacidad de las máquinas para realizar tareas que normalmente 
              requieren inteligencia humana, como reconocer patrones, tomar decisiones y aprender de la experiencia.
            </p>
          </motion.div>

          <div className="space-y-16 mb-16">
            <InfoSection
              title="Aprendizaje Automático"
              description="La IA aprende de los datos sin ser programada explícitamente. Cuantos más datos procesa, mejor se vuelve en sus predicciones y decisiones. Es como cuando aprendes a andar en bicicleta: al principio necesitas ayuda, pero con práctica lo haces automáticamente."
              imageUrl="https://images.unsplash.com/photo-1717501219604-cc1902b5d845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBuZXR3b3JrfGVufDF8fHx8MTc2MzY3NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080"
              icon={Cpu}
            />

            <InfoSection
              title="Redes Neuronales"
              description="Inspiradas en el cerebro humano, las redes neuronales artificiales son sistemas de nodos interconectados que procesan información. Cada conexión aprende a reconocer patrones específicos, permitiendo a la IA realizar tareas complejas como reconocer rostros o entender lenguaje."
              imageUrl="https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwY2lyY3VpdHxlbnwxfHx8fDE3NjM2NzcyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              icon={Network}
              reverse
            />

            <InfoSection
              title="Aplicaciones del Mundo Real"
              description="La IA está en todas partes: desde los filtros de spam en tu correo hasta las recomendaciones de películas en Netflix. Los asistentes de voz, los autos autónomos, el diagnóstico médico y hasta los videojuegos usan IA para funcionar mejor y adaptarse a tus necesidades."
              imageUrl="https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW58ZW58MXx8fHwxNzYzNjc1MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              icon={Lightbulb}
            />
          </div>
        </section>

        {/* AI Applications Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">Áreas de Aplicación de la IA</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              La Inteligencia Artificial se aplica en múltiples campos, transformando la manera 
              en que interactuamos con la tecnología.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiApplications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AIApplicationCard
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                  examples={app.examples}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Topics Section */}
        <section id="learning" className="mb-20 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">📚 Temas de Aprendizaje Detallados</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              Profundiza en diferentes aspectos de la IA con nuestras guías interactivas. 
              Haz click en cualquier tema para acceder al contenido completo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningContents.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <LearningTopicCard
                  title={content.title}
                  description={content.introduction}
                  icon={content.icon}
                  difficulty={content.difficulty}
                  duration={content.duration}
                  onClick={() => handleSelectLearningTopic(content.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section id="games" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">Juegos Interactivos de IA</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              Experimenta con la IA de primera mano a través de nuestros juegos educativos. 
              Aprende jugando y descubre cómo funcionan estas tecnologías.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GameCard
                  title={game.title}
                  description={game.description}
                  imageUrl={game.imageUrl}
                  aiApplication={game.aiApplication}
                  isAvailable={game.isAvailable}
                  onPlay={() => handlePlayGame(game.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Info Footer */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white/10 backdrop-blur-lg rounded-lg px-8 py-6 text-white">
              <p className="mb-2">
                🎮 1 juego disponible • 5 próximamente
              </p>
              <p className="text-purple-200">
                Nuevos juegos educativos de IA añadidos regularmente
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-purple-300">
            <p className="mb-2">AI GameSpot - Aprende sobre Inteligencia Artificial jugando</p>
            <p>Una plataforma educativa interactiva</p>
          </div>
        </div>
      </footer>
    </div>
  );
}