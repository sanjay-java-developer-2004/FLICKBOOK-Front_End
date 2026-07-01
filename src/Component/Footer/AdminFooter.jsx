

export default function AdminFooter() {
    return (
        <footer className="admin-footer">
            <div className="admin-footer-inner">

                {/* Brand */}
                <div className="admin-footer-brand">
                    <h2 className="admin-footer-logo">FLICKBOOK</h2>
                    <p className="admin-footer-tagline">Manage your theatre. Control every show.</p>
                </div>

                {/* Quick actions */}
                <div className="admin-footer-section">
                    <h6 className="admin-footer-heading">Quick Actions</h6>
                    <ul>
                        <li><i className="fa-solid fa-chart-line"></i> Dashboard</li>
                        <li><i className="fa-solid fa-clapperboard"></i> Add Show</li>
                        <li><i className="fa-solid fa-film"></i>Movies</li>
                    </ul>
                </div>

                {/* Social */}
                <div className="admin-footer-section">
                    <h6 className="admin-footer-heading">Follow Us</h6>
                    <div className="admin-social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="admin-social-btn">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="admin-social-btn">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="admin-social-btn">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="admin-social-btn">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="admin-social-btn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="admin-footer-bottom">
                <span>© {new Date().getFullYear()} FLICKBOOK Admin Panel. All rights reserved.</span>
                <span className="admin-footer-bottom-links">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </span>
            </div>
        </footer>
    );
}