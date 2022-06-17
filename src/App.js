import React from "react";
//Rutas
import UnloggedRouter from "./routes/unlogged/UnloggedRouter";
import LoggedInRouter from "./routes/loggedIn/LoggedInRouter";
//Redux
import { useSelector } from "react-redux";
//Hooks
import useAuthData from "./modules/Auth/hooks/useAuthData";
//componentes
import Loading from "./modules/Global/components/Loading";

export default function App() {
  const { showLoading } = useAuthData();
  const { userID } = useSelector((state) => state.authData);

  return showLoading ? (
    <Loading />
  ) : (
    <>{userID ? <LoggedInRouter /> : <UnloggedRouter />}</>
  );
}
