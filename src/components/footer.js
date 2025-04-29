import React from "react";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import "../components/footer.css"; 

// Importez les images
import facebook from "../asset/facebook.svg";
import instagram from "../asset/instagram.svg";
import linkedin from "../asset/linkedin.svg";
import twitter from "../asset/twitter.svg";
import awardLogo from "../asset/Award Logo.webp"; // Importez Award Logo
import certificationLogo from "../asset/Certification Logo.webp"; // Importez Certification Logo

const Footer1 = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

               
                
                <div className="footer-section contact-info">
                    <h4>Informations de contact</h4>
                    <p><strong>🏨 RoyelStay</strong></p>
                    <p>📍 <strong>Adresse :</strong> Rue King Fahd, Quartier Olaya, Riyad, Arabie Saoudite</p>
                    <p>📞 <strong>Téléphone :</strong> +966 55 123 4567</p>
        <p>✉️ <strong>E-mail :</strong> <a href="mailto:info@dreamhotel.com">info@dreamhotel.com</a></p>
        <p>🌐 <strong>Site Web :</strong> <a href="https://www.dreamhotel.com">www.dreamhotel.com</a></p>
        
                </div>
                
                <div className="footer-section">
                    <h4>Suivez-nous</h4>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook"/></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram"/></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn"/></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter"/></a>
                    </div>
                </div>

                <div className="footer-section map">
                    <h4>Notre emplacement</h4>
                    <iframe
                        title="hotel-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3083357460355!2d-122.08400008468116!3d37.42199977982461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7607597d23b%3A0x7a5752bfe85f482!2sGoogle!5e0!3m2!1sen!2sus!4v1611549129984!5m2!1sen!2sus"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>

                <div className="footer-section awards">
                    <h4>Récompenses et certifications</h4>
                    <div className="award-item">
                        <img src={awardLogo} alt="Award Logo" />
                        <span>Meilleur Hôtel 2025</span> {/* Nom du prix */}
                    </div>
                    <div className="award-item">
                        <img src={certificationLogo} alt="Certification Logo" />
                        <span>Certification Écologique </span> {/* Nom de la certification */}
                    </div>
                </div>

                
            </div>
            <div className="footer-section copyright">
                    <p>&copy; 2025 Hôtel. Tous droits réservés.</p>
                </div>
        </footer>
    );
};

export default Footer1;