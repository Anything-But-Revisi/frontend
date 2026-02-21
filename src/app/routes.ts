import { createBrowserRouter } from "react-router";
import { Hero } from "./components/hero";
import { Splash } from "./pages/splash";
import { Landing } from "./pages/landing";
import { AssessmentStep1 } from "./pages/assessment/step-1";
import { AssessmentStep2 } from "./pages/assessment/step-2";
import { AssessmentStep3 } from "./pages/assessment/step-3";
import { AssessmentStep4 } from "./pages/assessment/step-4";
import { AssessmentStep5 } from "./pages/assessment/step-5";
import { Result } from "./pages/result";
import { Chat } from "./pages/chat";
import { Report } from "./pages/report";
import { Reports } from "./pages/reports";
import { Insights } from "./pages/insights";
import { Settings } from "./pages/settings";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/home",
    Component: Hero,
  },
  {
    path: "/assessment/step-1",
    Component: AssessmentStep1,
  },
  {
    path: "/assessment/step-2",
    Component: AssessmentStep2,
  },
  {
    path: "/assessment/step-3",
    Component: AssessmentStep3,
  },
  {
    path: "/assessment/step-4",
    Component: AssessmentStep4,
  },
  {
    path: "/assessment/step-5",
    Component: AssessmentStep5,
  },
  {
    path: "/result",
    Component: Result,
  },
  {
    path: "/chat",
    Component: Chat,
  },
  {
    path: "/report",
    Component: Report,
  },
  {
    path: "/reports",
    Component: Reports,
  },
  {
    path: "/insights",
    Component: Insights,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/login",
    Component: Login,
  },
]);
