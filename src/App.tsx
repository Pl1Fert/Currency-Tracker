import { RouterProvider } from "react-router-dom";

import { LoadingSpinner } from "@/components";
import { MainRouter } from "@/routers";

const App = () => <RouterProvider router={MainRouter} fallbackElement={<LoadingSpinner />} />;

export default App;
