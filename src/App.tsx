import { RouterProvider } from "react-router-dom";

import { MainRouter } from "@/routers";

import { LoadingSpinner } from "./components";

const App = () => <RouterProvider router={MainRouter} fallbackElement={<LoadingSpinner />} />;

export default App;
