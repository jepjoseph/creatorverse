import { useRoutes } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <ShowCreators />,
    },
    {
      path: "/creator/:id",
      element: <ViewCreator />,
    },
    {
      path: "/creator/:id/edit",
      element: <EditCreator />,
    },
    {
      path: "/new",
      element: <AddCreator />,
    },
  ]);

  return routes;
}

export default App;
