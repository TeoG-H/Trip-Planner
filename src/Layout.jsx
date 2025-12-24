import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
