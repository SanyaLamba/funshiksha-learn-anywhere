import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  MapPin, 
  Calculator, 
  Languages, 
  BookText,
  Globe,
  Users
} from "lucide-react";

interface StudentData {
  name: string;
  rollNumber: string;
  classId: string;
}

interface Subject {
  id: string;
  name: string;
  icon: React.ElementType;
  progress: number;
  color: string;
  route: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("studentData");
    if (stored) {
      setStudentData(JSON.parse(stored));
    } else {
      navigate("/role-selection");
    }
  }, [navigate]);

  const subjects: Subject[] = [
    {
      id: "sst",
      name: "Social Studies",
      icon: MapPin,
      progress: 65,
      color: "text-blue-600",
      route: "/game/sst"
    },
    {
      id: "math",
      name: "Mathematics", 
      icon: Calculator,
      progress: 42,
      color: "text-green-600",
      route: "#"
    },
    {
      id: "odia",
      name: "Odia Language",
      icon: Languages,
      progress: 78,
      color: "text-orange-600", 
      route: "/game/odia"
    },
    {
      id: "english",
      name: "English",
      icon: BookText,
      progress: 58,
      color: "text-purple-600",
      route: "#"
    },
    {
      id: "science",
      name: "Science",
      icon: Globe,
      progress: 33,
      color: "text-red-600",
      route: "#"
    },
    {
      id: "hindi",
      name: "Hindi",
      icon: Users,
      progress: 71,
      color: "text-indigo-600",
      route: "#"
    }
  ];

  if (!studentData) return null;

  const handleSubjectClick = (subject: Subject) => {
    if (subject.route !== "#") {
      navigate(subject.route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary rounded-full p-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Welcome, {studentData.name}!
              </h1>
              <p className="text-muted-foreground">
                Class {studentData.classId} • Roll No: {studentData.rollNumber}
              </p>
            </div>
          </div>
          <div className="bg-warning/20 rounded-xl p-3">
            <Trophy className="w-8 h-8 text-warning-foreground" />
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-primary">Overall Progress</h2>
            <span className="text-2xl font-bold text-primary">58%</span>
          </div>
          <Progress value={58} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Great progress! Keep learning to unlock more achievements.
          </p>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <Card
              key={subject.id}
              className="p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-medium hover:scale-105 bg-white/70 backdrop-blur-sm"
              onClick={() => handleSubjectClick(subject)}
            >
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <Icon className={`w-8 h-8 ${subject.color}`} />
              </div>
              <h3 className="font-semibold text-primary mb-3">{subject.name}</h3>
              
              <div className="space-y-2">
                <Progress value={subject.progress} className="h-2" />
                <p className="text-sm font-medium text-muted-foreground">
                  {subject.progress}% Complete
                </p>
              </div>

              {subject.route !== "#" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4 w-full"
                >
                  Play Now
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <Card className="p-4 text-center bg-gradient-success">
          <p className="text-white/80 text-sm">Games Played</p>
          <p className="text-2xl font-bold text-white">12</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-warm">
          <p className="text-white/80 text-sm">Achievements</p>
          <p className="text-2xl font-bold text-white">5</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-primary">
          <p className="text-white/80 text-sm">Streak</p>
          <p className="text-2xl font-bold text-white">7 days</p>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;