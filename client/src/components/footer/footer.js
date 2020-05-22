import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-items">
        <div className="footer-item">
          <h4 className="footer-item-header">About ReportaHealth</h4>
          <p>
            A crowd sourcing health facility app for checking registered and
            unregistered health facilities and reporting unregistered health
            facilities for enhanced quality health service delivery in Nigeria
          </p>
        </div>
        <div className="footer-item">
          <h4 className="footer-item-header">Important Links</h4>
          <ul>
            <li>
              <i className="fas fa-square"></i>
              Read our Privacy Policy
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <h4 className="footer-item-header">Social Media</h4>
          <div className="footer-icons">
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-google-plus-square" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <p className="copyright">
        Copyright © {new Date().getFullYear()} Viable Knowledge Masters
      </p>
    </div>
  );
};

export default Footer;
