import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import RoleSelection from "./pages/RoleSelection";
import ClassSelection from "./pages/ClassSelection";
import StudentRegistration from "./pages/StudentRegistration";
import StudentDashboard from "./pages/StudentDashboard";
import SSTGame from "./pages/games/SSTGame";
import OdiaGame from "./pages/games/OdiaGame";
import TeacherDashboard from "./pages/TeacherDashboard";
import ClassDetail from "./pages/ClassDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/class-selection" element={<ClassSelection />} />
          <Route path="/student-registration" element={<StudentRegistration />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/game/sst" element={<SSTGame />} />
          <Route path="/game/odia" element={<OdiaGame />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/class/:classId" element={<ClassDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
