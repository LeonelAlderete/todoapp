//layout
import LoggedInLayout from "../../modules/Global/layout/LoggedInLayout";
//componentes
import Home from "../../pages/Home";
import Error404 from "../../modules/Global/components/Error404";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
    layout: LoggedInLayout,
  },
  {
    layout: LoggedInLayout,
    component: Error404,
  },
];

export default routes;
