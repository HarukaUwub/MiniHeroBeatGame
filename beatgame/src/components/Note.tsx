interface Props {
  y: number;
  lane: number;
  type?: 'normal' | 'hold' | 'rapid';
}

export default function Note({ y, lane, type = 'normal' }: Props) {
  const getNoteStyle = () => {
    const baseColors = [
      "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/50",
      "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-400/50", 
      "bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/50",
      "bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/50"
    ];
    
    const glowColors = [
      "shadow-blue-500/50",
      "shadow-yellow-400/50",
      "shadow-green-500/50", 
      "shadow-red-500/50"
    ];

    let baseStyle = baseColors[lane];
    const glowStyle = glowColors[lane];
    let sizeClass = "w-20 h-3";
    let animationClass = "animate-note-glow";

    // Modify style based on note type
    switch (type) {
      case 'rapid':
        baseStyle = baseColors[lane].replace('500', '400').replace('600', '500');
        sizeClass = "w-16 h-2";
        animationClass = "animate-pulse";
        break;
      case 'hold':
        baseStyle = baseColors[lane].replace('500', '600').replace('600', '700');
        sizeClass = "w-20 h-4";
        animationClass = "animate-bounce";
        break;
      default:
        // Normal note - use default styles
        break;
    }

    return { baseStyle, glowStyle, sizeClass, animationClass };
  };

  const { baseStyle, glowStyle, sizeClass, animationClass } = getNoteStyle();

  return (
    <div
      className={`absolute ${baseStyle} ${sizeClass} rounded-full shadow-lg ${glowStyle} ${animationClass}`}
      style={{ 
        left: lane * 100 + 30, 
        top: y,
        boxShadow: `0 0 10px ${glowStyle.split('/')[0].replace('shadow-', '').replace('-500', '')}`
      }}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
      
      {/* Trail effect */}
      <div 
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-current to-transparent opacity-60"
        style={{ height: Math.min(y / 10, 20) }}
      ></div>

      {/* Special effects for different note types */}
      {type === 'rapid' && (
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
      )}
      
      {type === 'hold' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>
      )}
    </div>
  );
}
