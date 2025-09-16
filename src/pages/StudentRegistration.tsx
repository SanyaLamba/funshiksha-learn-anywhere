import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classId = location.state?.classId || "6";
  
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.rollNumber.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Store student data
    localStorage.setItem("studentData", JSON.stringify({
      ...formData,
      classId,
    }));

    toast.success("Registration successful! Welcome to Funshiksha!");
    navigate("/student-dashboard");
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
        <div>
          <h1 className="text-3xl font-bold text-primary">Student Registration</h1>
          <p className="text-muted-foreground">Class {classId} • Enter your details</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 shadow-medium">
          <div className="text-center mb-6">
            <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary">Let's Get Started!</h2>
            <p className="text-muted-foreground">Tell us about yourself</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="py-3 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="py-3 text-lg"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-hover"
              size="lg"
            >
              Start Learning Journey
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;