function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Admin Panel</div>
      <ul className="navbar-links">
        <li>
          <a href="#blogs">Blogs</a>
        </li>
        <li>
          <a href="#videos">Videos</a>
        </li>
        <li>
          <a href="#settings">Settings</a>
        </li>
        <li>
          <a href="#logout" className="logout-btn">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
