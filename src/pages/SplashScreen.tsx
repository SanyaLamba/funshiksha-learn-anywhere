import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Gamepad2 } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/role-selection"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 120); // 6 seconds total

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center p-6 text-center">
      {/* Logo and App Name */}
      <div className="animate-bounce-in mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-strong">
          <GraduationCap className="w-20 h-20 mx-auto mb-4 text-white" />
          <h1 className="text-5xl font-bold text-white mb-2">Funshiksha</h1>
          <p className="text-white/90 text-lg">Fun Learning for All</p>
        </div>
      </div>

      {/* Features Icons */}
      <div className="flex space-x-6 mb-12 animate-fade-in">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-white/20 rounded-full p-1 backdrop-blur-sm">
        <div 
          className="bg-white rounded-full h-2 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-white/80 mt-4 text-sm">
        Preparing your learning adventure...
      </p>
    </div>
  );
};

export default SplashScreen;