import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* Brand */}
                <div className="footer-brand">
                    <h2 className="footer-logo">FLICKBOOK</h2>
                    <p className="footer-tagline">Book your seats. Live the moment.</p>
                </div>

                {/* Nav Links */}
                <div className="footer-links">
                    <h6 className="footer-heading">Quick Links</h6>
                    <ul>
                        <li onClick={() => navigate("/home")}>Home</li>
                        <li onClick={() => navigate("/movies")}>Movies</li>
                        <li onClick={() => navigate("/contact")}>Contact</li>
                    </ul>
                </div>

                {/* Social */}
                <div className="footer-social">
                    <h6 className="footer-heading">Follow Us</h6>
                    <div className="social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} FLICKBOOK. All rights reserved.</span>
                <span className="footer-bottom-links">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </span>
            </div>
        </footer>
    );
}