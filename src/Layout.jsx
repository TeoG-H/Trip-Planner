import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

export default function Layout() {
  return (
    <>
      <Header/>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
