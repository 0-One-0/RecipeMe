import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AppLayout() {
  let navigate = useNavigate();
  const location = useLocation();
  const highlightRef = useRef();
  const homeRef = useRef();
  const addRef = useRef();
  const listRef = useRef();
  async function SignOut() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  useGSAP(() => {
    let target;
    if (location.pathname === "/") target = homeRef.current;
    if (location.pathname === "/add") target = addRef.current;
    if (location.pathname === "/list") target = listRef.current;

    gsap.to([homeRef.current, addRef.current, listRef.current], { scale: 1, duration: 0.2, ease: "power3.inOut" });
    let tl = gsap.timeline();

    if (target) {
      tl.to(highlightRef.current, {
          x: target.offsetLeft,
          height: "3.5rem",
          delay: 0.1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          target,
          {
            scale: 1.3,
            ease: "power3.inOut",
            duration: 0.2,
            
          },
          "<",
        )
        .to(highlightRef.current, {
          width: target.offsetWidth,
          duration: 0.4,
          ease: "power2.out",
        });
    }
  }, [location.pathname]);
  return (
    <>
      <div className="App-bg">
        <button className="SignOut-btn" onClick={SignOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m20.2 4.02-10-2a.99.99 0 0 0-.83.21C9.14 2.42 9 2.7 9 3v1H4c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h5v1c0 .3.13.58.37.77.18.15.4.23.63.23.07 0 .13 0 .2-.02l10-2c.47-.09.8-.5.8-.98V5c0-.48-.34-.89-.8-.98M5 18V6h4v12zm14 .18-8 1.6V4.22l8 1.6z"></path>
            <path d="M13 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2"></path>
          </svg>
        </button>
        <Outlet />
        <nav className="layout-nav">
          <div className="hightlight-continer">
            <div ref={highlightRef} className="nav-highlight"></div>
            <Link ref={addRef} to="add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </Link>
            <Link ref={homeRef} to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm9-8.59 6 6V20H6v-9.59z"></path>
              </svg>
            </Link>
            <Link ref={listRef} to="/list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z"></path>
                <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h10v2H7z"></path>
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
