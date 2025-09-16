import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  User,
  ArrowLeft,
  BarChart3,
  MessageSquare
} from "lucide-react";

interface ClassData {
  id: string;
  name: string;
  students: number;
  accuracy: number;
  quizAttempts: number;
  submissions: number;
  gradient: string;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("");

  const classes: ClassData[] = [
    {
      id: "6a",
      name: "6th Grade Math A",
      students: 28,
      accuracy: 84,
      quizAttempts: 156,
      submissions: 23,
      gradient: "bg-gradient-junior"
    },
    {
      id: "6b", 
      name: "6th Grade Math B",
      students: 25,
      accuracy: 78,
      quizAttempts: 142,
      submissions: 18,
      gradient: "bg-gradient-junior"
    },
    {
      id: "7a",
      name: "7th Grade Science",
      students: 30,
      accuracy: 91,
      quizAttempts: 203,
      submissions: 29,
      gradient: "bg-gradient-junior"
    },
    {
      id: "8a",
      name: "8th Grade English",
      students: 26,
      accuracy: 76,
      quizAttempts: 134,
      submissions: 21,
      gradient: "bg-gradient-junior"
    },
    {
      id: "9a",
      name: "9th Grade Physics",
      students: 32,
      accuracy: 88,
      quizAttempts: 187,
      submissions: 31,
      gradient: "bg-gradient-middle"
    },
    {
      id: "10a",
      name: "10th Grade Chemistry",
      students: 29,
      accuracy: 82,
      quizAttempts: 165,
      submissions: 26,
      gradient: "bg-gradient-middle"
    },
    {
      id: "11a",
      name: "11th Grade Biology",
      students: 24,
      accuracy: 94,
      quizAttempts: 198,
      submissions: 22,
      gradient: "bg-gradient-senior"
    },
    {
      id: "12a",
      name: "12th Grade Advanced Math",
      students: 22,
      accuracy: 96,
      quizAttempts: 211,
      submissions: 20,
      gradient: "bg-gradient-senior"
    }
  ];

  const handleClassClick = (classData: ClassData) => {
    navigate(`/class/${classData.id}`, { state: { classData } });
  };

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
  const avgAccuracy = Math.round(classes.reduce((sum, cls) => sum + cls.accuracy, 0) / classes.length);
  const totalAttempts = classes.reduce((sum, cls) => sum + cls.quizAttempts, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/role-selection")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="bg-primary rounded-full p-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Teacher Dashboard</h1>
              <p className="text-muted-foreground">Monitor your classes and student progress</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Announcements
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-white">{totalStudents}</p>
            </div>
            <Users className="w-10 h-10 text-white/80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Average Accuracy</p>
              <p className="text-3xl font-bold text-white">{avgAccuracy}%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-white/80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-warm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Quiz Attempts</p>
              <p className="text-3xl font-bold text-white">{totalAttempts}</p>
            </div>
            <BookOpen className="w-10 h-10 text-white/80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Active Classes</p>
              <p className="text-3xl font-bold text-white">{classes.length}</p>
            </div>
            <Award className="w-10 h-10 text-white/80" />
          </div>
        </Card>
      </div>

      {/* Classes Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Your Classes</h2>
          <Badge variant="outline" className="px-3 py-1">
            Academic Year 2024-25
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.map((classData) => (
            <Card
              key={classData.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-medium hover:scale-105 ${classData.gradient} border-0 ${
                classData.id === "6a" ? "ring-4 ring-yellow-400 ring-opacity-50" : ""
              }`}
              onClick={() => handleClassClick(classData)}
            >
              {classData.id === "6a" && (
                <Badge className="bg-yellow-400 text-yellow-900 mb-3 px-2 py-1 text-xs">
                  Featured
                </Badge>
              )}
              
              <div className="text-white mb-4">
                <h3 className="text-lg font-bold mb-2">{classData.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-white/90">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {classData.students}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {classData.accuracy}%
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-white/90 text-sm mb-1">
                    <span>Accuracy</span>
                    <span>{classData.accuracy}%</span>
                  </div>
                  <Progress value={classData.accuracy} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <p className="text-white text-xs">Quiz Attempts</p>
                    <p className="text-white font-bold">{classData.quizAttempts}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <p className="text-white text-xs">Submissions</p>
                    <p className="text-white font-bold">{classData.submissions}</p>
                  </div>
                </div>
              </div>

              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full mt-4 bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 cursor-pointer">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold text-primary mb-2">Create New Quiz</h3>
          <p className="text-sm text-muted-foreground">Design interactive quizzes for your students</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 cursor-pointer">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-secondary" />
          <h3 className="font-semibold text-primary mb-2">Send Announcement</h3>
          <p className="text-sm text-muted-foreground">Notify students about important updates</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 cursor-pointer">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h3 className="font-semibold text-primary mb-2">View Analytics</h3>
          <p className="text-sm text-muted-foreground">Analyze student performance and engagement</p>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;