import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/landing.page";
import { RootStartPage } from "./pages/start/root.start.page";
import { GoalStartPage } from "./pages/start/goal.start.page";
import { StepStartPage } from "./pages/start/step.start.page";
import { TasksStartPage } from "./pages/start/tasks.start.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/start",
    element: <RootStartPage />,
    children: [
      {
        element: <GoalStartPage />,
        index: true,
      },
      {
        path: "step",
        element: <StepStartPage />,
      },
      {
        path: "tasks",
        element: <TasksStartPage />,
      },
    ],
  },
]);
