import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, IdCard, Lock, LogIn, GraduationCap } from "lucide-react";
import funshikshaLogo from "@/assets/funshiksha-logo.png";

const TeacherLogin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    loginId: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (formData.name && formData.loginId && formData.password) {
      // Store teacher info for the session
      localStorage.setItem("teacherInfo", JSON.stringify({
        ...formData,
        loginTime: new Date().toISOString()
      }));
      navigate("/teacher-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/role-selection")}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <img src={funshikshaLogo} alt="Funshiksha Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-primary font-display">Teacher Login</h1>
            <p className="text-muted-foreground">Access your teaching dashboard</p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-strong">
          <div className="text-center mb-6">
            <div className="bg-secondary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome, Teacher!</h2>
            <p className="text-muted-foreground">Monitor and guide your students</p>
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
              <Label htmlFor="loginId" className="text-sm font-medium">
                Login ID
              </Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="loginId"
                  type="text"
                  placeholder="Enter your login ID"
                  value={formData.loginId}
                  onChange={(e) => handleInputChange("loginId", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!formData.name || !formData.loginId || !formData.password}
              className="w-full py-6 text-lg font-semibold bg-secondary hover:bg-secondary-hover disabled:opacity-50"
              size="lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Access Dashboard
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Secure login for authorized teachers only
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherLogin;