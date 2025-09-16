import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface State {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'unguessed' | 'selected' | 'correct' | 'revealed';
}

const SSTGame = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState<string>("");
  const [guess, setGuess] = useState("");
  const [gameStates, setGameStates] = useState<State[]>([]);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Initialize states with positions (simplified for demo)
  useEffect(() => {
    const initialStates: State[] = [
      // Pre-labeled states (green)
      { id: "rajasthan", name: "Rajasthan", x: 20, y: 30, width: 12, height: 15, status: 'correct' },
      { id: "maharashtra", name: "Maharashtra", x: 25, y: 50, width: 10, height: 12, status: 'correct' },
      { id: "tamilnadu", name: "Tamil Nadu", x: 35, y: 70, width: 8, height: 12, status: 'correct' },
      { id: "punjab", name: "Punjab", x: 22, y: 15, width: 6, height: 8, status: 'correct' },
      { id: "delhi", name: "Delhi", x: 28, y: 20, width: 2, height: 2, status: 'correct' },
      
      // States to be guessed (pink)
      { id: "karnataka", name: "Karnataka", x: 30, y: 60, width: 9, height: 10, status: 'unguessed' },
      { id: "gujarat", name: "Gujarat", x: 15, y: 35, width: 10, height: 12, status: 'unguessed' },
      { id: "kerala", name: "Kerala", x: 32, y: 75, width: 4, height: 12, status: 'unguessed' },
      { id: "westbengal", name: "West Bengal", x: 60, y: 40, width: 8, height: 12, status: 'unguessed' },
      { id: "odisha", name: "Odisha", x: 55, y: 45, width: 8, height: 10, status: 'unguessed' },
      { id: "andhrapradesh", name: "Andhra Pradesh", x: 42, y: 60, width: 10, height: 12, status: 'unguessed' },
      { id: "madhyapradesh", name: "Madhya Pradesh", x: 35, y: 40, width: 14, height: 10, status: 'unguessed' },
      { id: "uttarpradesh", name: "Uttar Pradesh", x: 40, y: 25, width: 15, height: 12, status: 'unguessed' },
      { id: "bihar", name: "Bihar", x: 58, y: 30, width: 10, height: 8, status: 'unguessed' },
    ];
    
    setGameStates(initialStates);
    const initialDiscovered = initialStates.filter(s => s.status === 'correct').length;
    setDiscoveredCount(initialDiscovered);
  }, []);

  const handleStateClick = (stateId: string) => {
    const state = gameStates.find(s => s.id === stateId);
    if (!state || state.status === 'correct' || state.status === 'revealed') return;

    setSelectedState(stateId);
    setGameStates(prev => prev.map(s => 
      s.id === stateId 
        ? { ...s, status: 'selected' }
        : s.status === 'selected' 
        ? { ...s, status: 'unguessed' }
        : s
    ));
    setShowInput(true);
    setGuess("");
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !guess.trim()) return;

    const state = gameStates.find(s => s.id === selectedState);
    if (!state) return;

    // Fuzzy matching logic
    const normalizeString = (str: string) => 
      str.toLowerCase().replace(/[^a-z]/g, '').trim();
    
    const guessNorm = normalizeString(guess);
    const correctNorm = normalizeString(state.name);
    
    const isCorrect = guessNorm === correctNorm || 
                     guessNorm.includes(correctNorm) || 
                     correctNorm.includes(guessNorm) ||
                     // Handle common abbreviations
                     (correctNorm === "tamilnadu" && guessNorm === "tn") ||
                     (correctNorm === "andhrapradesh" && guessNorm === "ap") ||
                     (correctNorm === "madhyapradesh" && guessNorm === "mp") ||
                     (correctNorm === "uttarpradesh" && guessNorm === "up") ||
                     (correctNorm === "westbengal" && guessNorm === "wb");

    if (isCorrect) {
      setGameStates(prev => prev.map(s => 
        s.id === selectedState ? { ...s, status: 'correct' } : s
      ));
      setDiscoveredCount(prev => prev + 1);
      setFeedback("✅ Correct! Well done!");
      toast.success(`✨ ${state.name} discovered!`);
    } else {
      setGameStates(prev => prev.map(s => 
        s.id === selectedState ? { ...s, status: 'revealed' } : s
      ));
      setDiscoveredCount(prev => prev + 1);
      setFeedback(`❌ That's ${state.name}`);
      toast.error("Not quite right, but you discovered it!");
    }

    setSelectedState("");
    setShowInput(false);
    setGuess("");

    // Check completion
    const newTotal = discoveredCount + 1;
    if (newTotal >= gameStates.length) {
      setTimeout(() => {
        toast.success("🎉 Congratulations! You've discovered all states!");
        setFeedback("🌟 Amazing! You're a geography expert!");
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameStates(prev => prev.map(s => 
      ['rajasthan', 'maharashtra', 'tamilnadu', 'punjab', 'delhi'].includes(s.id)
        ? s
        : { ...s, status: 'unguessed' }
    ));
    setDiscoveredCount(5);
    setSelectedState("");
    setShowInput(false);
    setGuess("");
    setFeedback("");
  };

  const getStateColor = (status: State['status']) => {
    switch (status) {
      case 'unguessed': return 'fill-pink-400 hover:fill-pink-300';
      case 'selected': return 'fill-indigo-500';
      case 'correct': return 'fill-green-500';
      case 'revealed': return 'fill-orange-500';
      default: return 'fill-gray-300';
    }
  };

  const progressPercentage = Math.round((discoveredCount / gameStates.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
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
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Discover India</h1>
              <p className="text-sm text-muted-foreground">Click on states to learn their names</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Progress */}
      <Card className="mb-6 p-4 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-warning-foreground" />
            <span className="font-semibold">Discovered: {discoveredCount}/{gameStates.length}</span>
          </div>
          <span className="text-lg font-bold text-primary">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-3 animate-progress-fill" />
        {feedback && (
          <p className="text-sm mt-2 font-medium text-center">{feedback}</p>
        )}
      </Card>

      {/* Map Container */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-medium">
        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-green-100 rounded-xl overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {gameStates.map((state) => (
              <rect
                key={state.id}
                x={state.x}
                y={state.y}
                width={state.width}
                height={state.height}
                className={`${getStateColor(state.status)} cursor-pointer transition-all duration-300 stroke-white stroke-1`}
                onClick={() => handleStateClick(state.id)}
              />
            ))}
            
            {/* Labels for correct states */}
            {gameStates
              .filter(s => s.status === 'correct' || s.status === 'revealed')
              .map((state) => (
                <text
                  key={`label-${state.id}`}
                  x={state.x + state.width / 2}
                  y={state.y + state.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-xs font-bold pointer-events-none"
                  fontSize="1.5"
                >
                  {state.name}
                </text>
              ))}
          </svg>
        </div>

        {/* Input Form */}
        {showInput && (
          <div className="mt-6 animate-slide-up">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <form onSubmit={handleGuessSubmit} className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">
                    What is the name of this state?
                  </p>
                  <Input
                    type="text"
                    placeholder="Enter state name..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="text-lg"
                    autoFocus
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    Submit Guess
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowInput(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SSTGame;