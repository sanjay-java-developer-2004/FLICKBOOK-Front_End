import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/Usercontext";


export default function AdminNavBar() {
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/signin");
    };

    const  username = localStorage.getItem("username")

    return (
        <nav className="admin-nav">
            <div className="admin-nav-inner">

                {/* Logo */}
                <div className="admin-nav-logo" onClick={() => navigate("/dashboard")}>
                    FLICKBOOK
                    <span className="admin-badge">ADMIN</span>
                </div>

                {/* Links */}
                <div className="admin-nav-links">
                    <p onClick={() => navigate("/dashboard")}>
                        <i className="fa-solid fa-chart-line"></i> Dashboard
                    </p>
                    <p onClick={() => navigate("/addshow")}>
                        <i className="fa-solid fa-clapperboard"></i> Shows
                    </p>
                    <p onClick={() => navigate("/movies")}>
                        <i className="fa-solid fa-film"></i> Movies
                    </p>


                </div>

                {/* Right — user + logout */}
                <div className="admin-nav-right">
                    <span className="admin-username">
                        <i className="fa-regular fa-user"></i> {username}
                    </span>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                </div>

            </div>
        </nav>
    );
}