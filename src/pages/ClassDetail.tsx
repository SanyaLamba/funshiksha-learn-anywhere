import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Users, 
  Target, 
  FileText, 
  Clock,
  Medal,
  TrendingUp,
  MessageSquare,
  BarChart3
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  assignments: number;
  lastActivity: string;
  rank: number;
}

const ClassDetail = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const location = useLocation();
  const classData = location.state?.classData;
  const [filterBy, setFilterBy] = useState("overall");

  // Mock student data
  const students: Student[] = [
    { id: "1", name: "Arjun Patel", score: 945, accuracy: 94, assignments: 12, lastActivity: "2 hours ago", rank: 1 },
    { id: "2", name: "Priya Singh", score: 912, accuracy: 91, assignments: 11, lastActivity: "4 hours ago", rank: 2 },
    { id: "3", name: "Rahul Kumar", score: 888, accuracy: 89, assignments: 10, lastActivity: "1 day ago", rank: 3 },
    { id: "4", name: "Anjali Sharma", score: 876, accuracy: 88, assignments: 12, lastActivity: "3 hours ago", rank: 4 },
    { id: "5", name: "Vikram Reddy", score: 854, accuracy: 85, assignments: 9, lastActivity: "5 hours ago", rank: 5 },
    { id: "6", name: "Meera Gupta", score: 832, accuracy: 83, assignments: 11, lastActivity: "1 day ago", rank: 6 },
    { id: "7", name: "Karan Joshi", score: 798, accuracy: 80, assignments: 8, lastActivity: "2 days ago", rank: 7 },
    { id: "8", name: "Divya Nair", score: 776, accuracy: 78, assignments: 10, lastActivity: "6 hours ago", rank: 8 },
    { id: "9", name: "Rohit Agarwal", score: 743, accuracy: 74, assignments: 7, lastActivity: "1 day ago", rank: 9 },
    { id: "10", name: "Sneha Iyer", score: 721, accuracy: 72, assignments: 9, lastActivity: "3 days ago", rank: 10 },
  ];

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈"; 
      case 3: return "🥉";
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 900) return "text-green-600";
    if (score >= 800) return "text-yellow-600";
    return "text-red-600";
  };

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">Class not found</p>
          <Button onClick={() => navigate("/teacher-dashboard")}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/teacher-dashboard")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">{classData.name}</span>
        </div>
      </div>

      {/* Class Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{classData.name}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {classData.students} students
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                {classData.accuracy}% avg accuracy
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-white">{classData.students}</p>
              </div>
              <Users className="w-10 h-10 text-white/80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Average Accuracy</p>
                <p className="text-3xl font-bold text-white">{classData.accuracy}%</p>
              </div>
              <Target className="w-10 h-10 text-white/80" />
            </div>
            <Progress value={classData.accuracy} className="mt-2 h-2" />
          </Card>

          <Card className="p-6 bg-gradient-warm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Quiz Attempts</p>
                <p className="text-3xl font-bold text-white">{classData.quizAttempts}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-white/80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-secondary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Submissions</p>
                <p className="text-3xl font-bold text-white">{classData.submissions}</p>
              </div>
              <FileText className="w-10 h-10 text-white/80" />
            </div>
          </Card>
        </div>
      </div>

      {/* Student Leaderboard */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-medium">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Medal className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-primary">Student Leaderboard</h2>
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall Performance</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="quiz">Quiz Scores Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-primary">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Accuracy</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Assignments</th>
                <th className="text-left py-3 px-4 font-semibold text-primary">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student.id} 
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{student.rank}</span>
                      {getMedalIcon(student.rank) && (
                        <span className="text-lg">{getMedalIcon(student.rank)}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-bold text-lg ${getScoreColor(student.score)}`}>
                      {student.score}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{student.accuracy}%</span>
                      <div className="w-16">
                        <Progress value={student.accuracy} className="h-1" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="px-2 py-1">
                      {student.assignments}/12
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {student.lastActivity}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClassDetail;