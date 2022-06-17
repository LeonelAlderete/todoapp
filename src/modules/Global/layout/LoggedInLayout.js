import React from "react";
//componentes
import NavBar from "../components/NavBar";
import Offcanvas from "../components/Offcanvas";
import PrimaryModal from "../components/PrimaryModal";
import SecondaryModal from "../components/SecondaryModal";

export default function LoggedInLayout(props) {
  const { children } = props;

  return (
    <div className="layaout-padding-top">
      <NavBar />
      <Offcanvas />
      <PrimaryModal />
      <SecondaryModal />

      {children}
    </div>
  );
}
