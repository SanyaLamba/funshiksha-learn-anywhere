import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, UserCheck, ArrowLeft } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome to Funshiksha</h1>
          <p className="text-muted-foreground">Choose your role to continue</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="flex-1 flex flex-col justify-center space-y-6 max-w-md mx-auto w-full">
        <Card 
          className="p-8 text-center cursor-pointer hover:shadow-medium transition-all duration-300 hover:scale-105 bg-gradient-junior border-0"
          onClick={() => navigate("/class-selection")}
        >
          <div className="bg-white/20 rounded-full p-6 w-fit mx-auto mb-6">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">I'm a Student</h2>
          <p className="text-white/90">
            Start learning through interactive games and activities
          </p>
        </Card>

        <Card 
          className="p-8 text-center cursor-pointer hover:shadow-medium transition-all duration-300 hover:scale-105 bg-gradient-senior border-0"
          onClick={() => navigate("/teacher-dashboard")}
        >
          <div className="bg-white/20 rounded-full p-6 w-fit mx-auto mb-6">
            <UserCheck className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">I'm a Teacher</h2>
          <p className="text-white/90">
            Monitor student progress and manage classes
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;