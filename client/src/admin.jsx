import "./src/styles/AdminPage.css";

function AdminPage() {
  return (
    <div className="AdminPage">
      <header className="AdminPage-header">
        <h1>Admin Page</h1>
      </header>
      <div className="palette-container">
        <div className="color-box" style={{ backgroundColor: "#FF5733" }}></div>
        <div className="color-box" style={{ backgroundColor: "#33FF57" }}></div>
        <div className="color-box" style={{ backgroundColor: "#3357FF" }}></div>
        <div className="color-box" style={{ backgroundColor: "#FF33A1" }}></div>
        <div className="color-box" style={{ backgroundColor: "#33FFF3" }}></div>
      </div>
    </div>
  );
}

export default AdminPage;
