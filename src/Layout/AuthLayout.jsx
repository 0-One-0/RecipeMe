import { Form, Outlet } from "react-router-dom";
import "../index.css";

export default function AuthLayout() {
  return (
    <div className="AuthStyles">
      <div className="main-title">RecipeMe</div>
      <main>
        <Outlet />
      </main>

      
    </div>
  );
}