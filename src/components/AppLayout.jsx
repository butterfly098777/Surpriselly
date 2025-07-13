import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

export default function AppLayout() {
  const location = useLocation();
  const hidePaths = ["/login", "/signup"];
  const shouldHideNav = hidePaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}
      <FloatingButtons />
      <main className="pt-16">
        <Outlet />
      </main>
      {!shouldHideNav && <Footer />}
    </>
  );
}
