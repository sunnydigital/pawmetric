import { useState } from "react";
import { HomeDashboardCalm } from "./components/home-dashboard-calm";
import { HealthCheckCalm } from "./components/health-check-calm";
import { ScanCameraCalm } from "./components/scan-camera-calm";
import { ScanResultsCalm } from "./components/scan-results-calm";
import { VetChatFinal } from "./components/vet-chat-final";
import { VetLocationScreen } from "./components/vet-location-screen";
import { VetDirectoryScreen } from "./components/vet-directory-screen";
import { LogMealScreen } from "./components/log-meal-screen";
import { LogWalkScreen } from "./components/log-walk-screen";
import { ReportsScreenCalm } from "./components/reports-screen-calm";
import { ProfileScreenCalm } from "./components/profile-screen-calm";
import { MealScannerCamera } from "./components/meal-scanner-camera";
import { MealScanResults } from "./components/meal-scan-results";
import { OnboardingCarousel } from "./components/onboarding-carousel";
import { LoginScreen } from "./components/login-screen";
import { PetProfileSetup } from "./components/pet-profile-setup";
import { BottomNavCalm } from "./components/bottom-nav-calm";
import { ChevronLeft } from "lucide-react";
import { Button } from "./components/ui/button";
import { DarkModeProvider } from "./components/dark-mode-context";

type Screen =
  | "onboarding"
  | "login"
  | "pet-setup"
  | "home"
  | "health-check"
  | "scan-camera"
  | "scan-results"
  | "vet-chat"
  | "vet-directory"
  | "vet-location"
  | "log-meal"
  | "log-walk"
  | "reports"
  | "profile"
  | "meal-scanner"
  | "meal-scan-results";

type MainTab = "home" | "scans" | "vet" | "reports" | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("onboarding");
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  const [scanParams, setScanParams] = useState<any>({});

  const handleNavigate = (screen: string, params?: any) => {
    if (params) {
      setScanParams(params);
    }
    setCurrentScreen(screen as Screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as MainTab);

    // Map tabs to screens
    const tabScreenMap: Record<MainTab, Screen> = {
      home: "home",
      scans: "health-check",
      vet: "vet-directory",
      reports: "reports",
      profile: "profile",
    };

    setCurrentScreen(tabScreenMap[tab as MainTab]);
  };

  const handleBack = () => {
    // Navigation logic for back button
    if (currentScreen === "scan-camera") {
      setCurrentScreen("health-check");
    } else if (currentScreen === "scan-results") {
      setCurrentScreen("health-check");
    } else if (currentScreen === "vet-location") {
      setCurrentScreen("vet-directory");
    } else if (
      currentScreen === "vet-chat" ||
      currentScreen === "vet-directory"
    ) {
      setCurrentScreen("home");
    } else if (
      currentScreen === "log-meal" ||
      currentScreen === "log-walk"
    ) {
      setCurrentScreen("home");
    } else if (currentScreen === "meal-scanner") {
      setCurrentScreen("log-meal");
    } else if (currentScreen === "meal-scan-results") {
      setCurrentScreen("meal-scanner");
    } else {
      setCurrentScreen("home");
      setActiveTab("home");
    }
  };

  const showBackButton = [
    "health-check",
    "scan-camera",
    "scan-results",
    "vet-chat",
    "vet-directory",
    "vet-location",
    "log-meal",
    "log-walk",
    "meal-scanner",
    "meal-scan-results",
  ].includes(currentScreen);

  const showBottomNav = ![
    "onboarding",
    "login",
    "pet-setup",
    "scan-camera",
    "vet-chat",
    "meal-scanner",
  ].includes(currentScreen);

  return (
    <DarkModeProvider>
      <div className="size-full bg-[#1F2937] flex items-center justify-center relative">
        {/* Debug Helper - Skip to App (only on onboarding/login/setup) */}
        {(currentScreen === "onboarding" ||
          currentScreen === "login" ||
          currentScreen === "pet-setup") && (
          <div className="fixed top-6 right-6 z-50">
            <Button
              onClick={() => setCurrentScreen("home")}
              variant="outline"
              className="h-10 px-4 bg-white/90 backdrop-blur-sm border-[#E5E7EB] hover:bg-white rounded-full shadow-lg text-sm"
            >
              Skip to App
            </Button>
          </div>
        )}

        {/* iPhone 15 Pro Frame - 393 × 852 px */}
        <div
          className="bg-black relative overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-[48px] border-[8px] border-[#1F2937]"
          style={{
            width: "393px",
            height: "852px",
          }}
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-32 h-8 bg-black rounded-b-[24px]"></div>

          {/* Top Bar (conditionally shown) */}
          {showBackButton &&
            currentScreen !== "health-check" &&
            currentScreen !== "scan-camera" &&
            currentScreen !== "scan-results" &&
            currentScreen !== "meal-scanner" &&
            currentScreen !== "meal-scan-results" &&
            currentScreen !== "vet-location" &&
            currentScreen !== "vet-directory" && (
              <div className="bg-white/90 backdrop-blur-xl border-b border-[#E5E7EB] px-4 py-3 flex items-center gap-3 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-[#2563EB] hover:bg-blue-50 rounded-[12px] transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <h2 className="text-[#111827]">
                  {currentScreen === "vet-chat" && "Ask a Vet"}
                  {currentScreen === "log-meal" && "Log Meal"}
                  {currentScreen === "log-walk" && "Log Walk"}
                </h2>
              </div>
            )}

          {/* Calm-style Back Button for gradient screens */}
          {(currentScreen === "health-check" ||
            currentScreen === "scan-results" ||
            currentScreen === "reports" ||
            currentScreen === "profile" ||
            currentScreen === "meal-scan-results") && (
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-[12px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {(currentScreen === "scan-camera" ||
            currentScreen === "meal-scanner") && (
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-black/50 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Back Button for vet-location and vet-directory screens */}
          {(currentScreen === "vet-location" || currentScreen === "vet-directory") && (
            <div className="absolute top-4 left-4 z-20">
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-[12px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {currentScreen === "onboarding" && (
              <OnboardingCarousel
                onComplete={() => setCurrentScreen("login")}
              />
            )}
            {currentScreen === "login" && (
              <LoginScreen
                onComplete={() => setCurrentScreen("pet-setup")}
              />
            )}
            {currentScreen === "pet-setup" && (
              <PetProfileSetup
                onComplete={() => setCurrentScreen("home")}
              />
            )}
            {currentScreen === "home" && (
              <HomeDashboardCalm onNavigate={handleNavigate} />
            )}
            {currentScreen === "health-check" && (
              <HealthCheckCalm onNavigate={handleNavigate} />
            )}
            {currentScreen === "scan-camera" && (
              <ScanCameraCalm
                scanType={scanParams.type}
                scanTitle={scanParams.title}
                onNavigate={handleNavigate}
              />
            )}
            {currentScreen === "scan-results" && (
              <ScanResultsCalm
                scanType={scanParams.type}
                scanTitle={scanParams.title}
                onNavigate={handleNavigate}
              />
            )}
            {currentScreen === "vet-chat" && (
              <VetChatFinal onNavigate={handleNavigate} />
            )}
            {currentScreen === "vet-directory" && (
              <VetDirectoryScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "vet-location" && (
              <VetLocationScreen
                onNavigate={handleNavigate}
                locationId={scanParams.locationId}
              />
            )}
            {currentScreen === "log-meal" && (
              <LogMealScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "log-walk" && (
              <LogWalkScreen onNavigate={handleNavigate} />
            )}
            {currentScreen === "meal-scanner" && (
              <MealScannerCamera onNavigate={handleNavigate} />
            )}
            {currentScreen === "meal-scan-results" && (
              <MealScanResults onNavigate={handleNavigate} />
            )}
            {currentScreen === "reports" && (
              <ReportsScreenCalm onNavigate={handleNavigate} />
            )}
            {currentScreen === "profile" && (
              <ProfileScreenCalm onNavigate={handleNavigate} />
            )}
          </div>

          {/* Bottom Navigation */}
          {showBottomNav && (
            <BottomNavCalm
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}
        </div>
      </div>
    </DarkModeProvider>
  );
}