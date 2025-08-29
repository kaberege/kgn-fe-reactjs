import { NavLink } from "react-router";

export default function Header({ hide }) {
  return (
    <nav className={`nav-bar-header ${!hide && "nav-hide"}`}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "pending")}
      >
        Home
      </NavLink>
      <NavLink
        to="/die"
        className={({ isActive }) => (isActive ? "active" : "pending")}
      >
        Tenzies Die
      </NavLink>
      <NavLink
        to="/todo"
        className={({ isActive }) => (isActive ? "active" : "pending")}
      >
        ToDo-List
      </NavLink>
    </nav>
  );
}
