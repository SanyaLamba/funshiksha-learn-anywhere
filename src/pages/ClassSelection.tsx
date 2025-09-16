import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";

const ClassSelection = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<string>("");

  const classes = [
    { id: "6", name: "Class 6", gradient: "bg-gradient-junior" },
    { id: "7", name: "Class 7", gradient: "bg-gradient-junior" },
    { id: "8", name: "Class 8", gradient: "bg-gradient-junior" },
    { id: "9", name: "Class 9", gradient: "bg-gradient-middle" },
    { id: "10", name: "Class 10", gradient: "bg-gradient-middle" },
    { id: "11", name: "Class 11", gradient: "bg-gradient-senior" },
    { id: "12", name: "Class 12", gradient: "bg-gradient-senior" },
  ];

  const handleContinue = () => {
    if (selectedClass) {
      navigate("/student-registration", { state: { classId: selectedClass } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col p-6">
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
        <div>
          <h1 className="text-3xl font-bold text-primary">Select Your Class</h1>
          <p className="text-muted-foreground">Choose which class you're studying in</p>
        </div>
      </div>

      {/* Class Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className={`p-6 text-center cursor-pointer transition-all duration-300 border-2 ${
              selectedClass === classItem.id 
                ? "border-primary shadow-medium scale-105" 
                : "border-transparent hover:shadow-soft"
            } ${classItem.gradient}`}
            onClick={() => setSelectedClass(classItem.id)}
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-xl font-bold text-white">{classItem.name}</h3>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-8 max-w-lg mx-auto w-full">
        <Button
          onClick={handleContinue}
          disabled={!selectedClass}
          className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary-hover disabled:opacity-50"
          size="lg"
        >
          Continue to Registration
        </Button>
      </div>
    </div>
  );
};

export default ClassSelection;