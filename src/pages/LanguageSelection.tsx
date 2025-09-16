import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Languages, ArrowRight } from "lucide-react";
import funshikshaLogo from "@/assets/funshiksha-logo.png";

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const languages = [
    { id: "english", name: "English", nativeName: "English" },
    { id: "hindi", name: "Hindi", nativeName: "हिंदी" },
    { id: "odia", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  ];

  const handleContinue = () => {
    if (selectedLanguage) {
      // Store language preference (could be in localStorage for offline use)
      localStorage.setItem("selectedLanguage", selectedLanguage);
      navigate("/role-selection");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <img src={funshikshaLogo} alt="Funshiksha Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-primary mb-2 font-display">Choose Your Language</h1>
        <p className="text-muted-foreground">अपनी भाषा चुनें | ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ</p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-md space-y-4 mb-8">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
              selectedLanguage === language.id
                ? "border-primary shadow-medium scale-105 bg-primary/5"
                : "border-transparent hover:shadow-soft hover:border-primary/20"
            }`}
            onClick={() => setSelectedLanguage(language.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Languages className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{language.name}</h3>
                  <p className="text-muted-foreground">{language.nativeName}</p>
                </div>
              </div>
              {selectedLanguage === language.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedLanguage}
        className="w-full max-w-md py-6 text-lg font-semibold bg-primary hover:bg-primary-hover disabled:opacity-50"
        size="lg"
      >
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default LanguageSelection;