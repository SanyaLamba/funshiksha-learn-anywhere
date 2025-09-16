import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, RotateCcw, Award } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
  meaning: string;
}

const OdiaGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      image: "🦁",
      correctAnswer: "ସିଂହ ପରି ସାହସ",
      options: ["ସିଂହ ପରି ସାହସ", "ବାଘ ପରି ଦୌଡ଼", "ହାତୀ ପରି ବଳ", "କୁକୁର ପରି ବିଶ୍ୱସ୍ତ"],
      meaning: "Courage like a lion"
    },
    {
      id: 2,
      image: "🌙",
      correctAnswer: "ଆକାଶରେ ଚାନ୍ଦ ଧରିବା",
      options: ["ଆକାଶରେ ଚାନ୍ଦ ଧରିବା", "ସୂର୍ଯ୍ୟ ଧରିବା", "ତାରା ଗଣିବା", "ମେଘ ଧରିବା"],
      meaning: "Attempting the impossible (catching the moon)"
    },
    {
      id: 3,
      image: "🪞",
      correctAnswer: "ଦର୍ପଣରେ ମୁହଁ ଦେଖିବା",
      options: ["ଦର୍ପଣରେ ମୁହଁ ଦେଖିବା", "ପାଣିରେ ମୁହଁ ଦେଖିବା", "ଚିତ୍ର ଦେଖିବା", "ଛବି ଦେଖିବା"],
      meaning: "Self-reflection and introspection"
    },
    {
      id: 4,
      image: "🐘",
      correctAnswer: "ହାତୀର ଦାନ୍ତ ଖାଇବାକୁ ଆଉ, ଦେଖାଇବାକୁ ଆଉ",
      options: ["ହାତୀର ଦାନ୍ତ ଖାଇବାକୁ ଆଉ, ଦେଖାଇବାକୁ ଆଉ", "ହାତୀ ବଡ଼ ବଳବାନ", "ହାତୀ ବହୁତ ଭାରି", "ହାତୀର ମନ ବଡ଼"],
      meaning: "Actions vs appearances (having different faces)"
    },
    {
      id: 5,
      image: "🌊",
      correctAnswer: "ସମୁଦ୍ରରେ ଲୁଣ ପକାଇବା",
      options: ["ସମୁଦ୍ରରେ ଲୁଣ ପକାଇବା", "ନଦୀରେ ପାଣି ପକାଇବା", "ଆଗରେ ମାଟି ପକାଇବା", "ଗଛରେ ପତ୍ର ଦେବା"],
      meaning: "Adding to abundance (unnecessary addition)"
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      toast.success("✅ Correct! Well done!");
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setStreak(0);
      toast.error("❌ Not quite right. Try again next time!");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
        setShowFeedback(false);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setShowFeedback(false);
    setGameComplete(false);
    setStreak(0);
  };

  const getScoreBadge = () => {
    const percentage = (score / (questions.length * 10)) * 100;
    if (percentage >= 80) return { badge: "🥇 Gold", color: "text-yellow-600" };
    if (percentage >= 60) return { badge: "🥈 Silver", color: "text-gray-500" };
    if (percentage >= 40) return { badge: "🥉 Bronze", color: "text-amber-700" };
    return { badge: "🎯 Good Try", color: "text-blue-600" };
  };

  if (gameComplete) {
    const { badge, color } = getScoreBadge();
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-white/80 backdrop-blur-sm shadow-strong">
          <div className="mb-6">
            <Award className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-2">Game Complete!</h1>
            <div className={`text-2xl font-bold ${color} mb-4`}>{badge}</div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-lg font-semibold">Final Score</p>
              <p className="text-3xl font-bold text-primary">{score}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/10 rounded-lg p-3">
                <p className="text-sm">Questions</p>
                <p className="text-xl font-bold">{questions.length}</p>
              </div>
              <div className="bg-warning/10 rounded-lg p-3">
                <p className="text-sm">Best Streak</p>
                <p className="text-xl font-bold">{streak}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={resetGame} className="flex-1">
              Play Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/student-dashboard")}
              className="flex-1"
            >
              Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/student-dashboard")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Odia Idiom Quiz</h1>
            <p className="text-sm text-muted-foreground">Match the picture with the idiom</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Progress & Score */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-lg font-bold">{currentQuestion + 1}/{questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>
        
        <Card className="p-4 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-warning-foreground" />
              <span className="text-sm font-medium">Score</span>
            </div>
            <span className="text-lg font-bold text-primary">{score}</span>
          </div>
        </Card>
      </div>

      {/* Question Card */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-medium mb-6">
        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{question.image}</div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Which Odia idiom matches this picture?
          </h2>
          {showFeedback && (
            <p className="text-sm text-muted-foreground italic">
              "{question.meaning}"
            </p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left transition-all duration-300 ";
            
            if (showFeedback) {
              if (option === question.correctAnswer) {
                buttonClass += "bg-success text-success-foreground border-success";
              } else if (option === selectedAnswer) {
                buttonClass += "bg-destructive text-destructive-foreground border-destructive";
              } else {
                buttonClass += "bg-muted text-muted-foreground";
              }
            } else {
              buttonClass += "hover:bg-primary/10 hover:border-primary border-border";
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
              >
                <span className="text-lg font-medium">{option}</span>
                {showFeedback && option === question.correctAnswer && (
                  <span className="ml-auto">✅</span>
                )}
                {showFeedback && option === selectedAnswer && option !== question.correctAnswer && (
                  <span className="ml-auto">❌</span>
                )}
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Streak Indicator */}
      {streak > 0 && (
        <Card className="p-4 bg-gradient-success text-center">
          <p className="text-white font-semibold">
            🔥 Streak: {streak} correct answers!
          </p>
        </Card>
      )}
    </div>
  );
};

export default OdiaGame;