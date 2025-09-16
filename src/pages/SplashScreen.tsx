import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Gamepad2 } from "lucide-react";
import funshikshaLogo from "@/assets/funshiksha-logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/language-selection"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100); // 5 seconds total

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Logo and App Name */}
      <div className="animate-bounce-in mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-strong border border-white/20">
          <img src={funshikshaLogo} alt="Funshiksha Logo" className="w-32 h-32 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-2 font-display">Funshiksha</h1>
          <p className="text-muted-foreground text-lg">Offline Learning Platform</p>
        </div>
      </div>

      {/* Features Icons */}
      <div className="flex space-x-6 mb-12 animate-fade-in">
        <div className="bg-primary/10 rounded-2xl p-4 backdrop-blur-sm border border-primary/20">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <div className="bg-secondary/10 rounded-2xl p-4 backdrop-blur-sm border border-secondary/20">
          <Gamepad2 className="w-8 h-8 text-secondary" />
        </div>
        <div className="bg-accent/10 rounded-2xl p-4 backdrop-blur-sm border border-accent/20">
          <GraduationCap className="w-8 h-8 text-accent" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-muted/30 rounded-full p-1 backdrop-blur-sm border border-primary/20">
        <div 
          className="bg-primary rounded-full h-2 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-muted-foreground mt-4 text-sm">
        शिक्षा अभियान तैयार हो रहा है...
      </p>
    </div>
  );
};

export default SplashScreen;