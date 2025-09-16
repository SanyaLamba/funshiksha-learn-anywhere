import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Hash, LogIn } from "lucide-react";
import funshikshaLogo from "@/assets/funshiksha-logo.png";

const StudentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classId = location.state?.classId || "6";
  
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (formData.name && formData.rollNumber) {
      // Store student info for offline use
      localStorage.setItem("studentInfo", JSON.stringify({
        ...formData,
        classId,
        loginTime: new Date().toISOString()
      }));
      navigate("/student-dashboard", { state: { classId, studentInfo: formData } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/class-selection")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <img src={funshikshaLogo} alt="Funshiksha Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-primary font-display">Student Login</h1>
            <p className="text-muted-foreground">Class {classId} - Enter your details</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-strong">
          <div className="text-center mb-6">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <User className="w-8 h-8 text-primary mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">Ready to continue learning?</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-sm font-medium">
                Roll Number
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!formData.name || !formData.rollNumber}
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-hover disabled:opacity-50"
              size="lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Enter Dashboard
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Your progress will be saved locally for offline access
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;