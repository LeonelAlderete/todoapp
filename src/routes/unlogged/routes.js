//Componentes
import Auth from "../../pages/Auth";
import RestorePassword from "../../modules/Auth/components/RestorePassword";
import Error404 from "../../modules/Global/components/Error404";
//constantes
import {
  LOGIN_FORM_PATH_VALUE,
  RESTORE_PASSWORD_PATH_VALUE,
} from "../../utils/constants/constants";

const routes = [
  {
    path: LOGIN_FORM_PATH_VALUE,
    component: Auth,
    exact: true,
  },
  {
    path: RESTORE_PASSWORD_PATH_VALUE,
    component: RestorePassword,
    exact: true,
  },
  {
    component: Error404,
  },
];

export default routes;
