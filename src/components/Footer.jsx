import { Shield, Globe } from 'lucide-react';

const TwitterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-main">
        <div className="footer-grid">
          {/* Logo and About column */}
          <div className="col-span-2">
            <a href="#" className="logo mb-6">
              <div className="logo-icon">
                <Shield size={18} />
              </div>
              <span>DealBlast</span>
            </a>
            <p className="footer-brand-desc">
              The premier destination for high-end electronics and limited-time deals. Inspired by premium aesthetics, built for discerning shoppers.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="footer-social-btn">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="footer-social-btn">
                <GithubIcon size={18} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="footer-col-title">Shop</h3>
            <ul className="footer-col-links">
              <li><a href="#">All Products</a></li>
              <li><a href="#">Featured Deals</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Support</h3>
            <ul className="footer-col-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns & Refunds</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-col-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} DealBlast Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Globe size={14} />
              <span>United States (English)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
