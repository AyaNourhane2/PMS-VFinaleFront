import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import coverImage1 from '../asset/img1.jpg';
import coverImage2 from '../asset/img2.jpg';
import coverImage3 from '../asset/image2.jpg';
import Footer1 from '../components/footer';

function Home() {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const images = [coverImage1, coverImage2, coverImage3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Style commun pour les boutons
    const buttonStyle = {
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: '180px',
        margin: '0 10px',
        transition: 'all 0.3s ease',
    };

    const handleLearnMoreClick = () => navigate('/plus-information');
    const handleLoginClick = () => navigate('/login');
    const handleRegisterClick = () => navigate('/signup');

    return (
        <div>
            <div style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
                transition: 'background-image 1s ease-in-out'
            }}>
                <h2>
                    <strong style={{ fontSize: '3rem' }}>RoyalStay</strong>
                </h2>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '40px', maxWidth: '800px' }}>
                    Bienvenue à RoyalStay, où le luxe rencontre le confort pour une expérience de séjour exceptionnelle.
                </h3>

                {/* Conteneur des boutons avec flexbox */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}>
                    <button
                        onClick={handleLoginClick}
                        style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#333333';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#000000';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <FaSignInAlt style={{ fontSize: '18px' }} />
                        Se Connecter
                    </button>
                    
                    <button
                        onClick={handleRegisterClick}
                        style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#333333';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#000000';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <FaUserPlus style={{ fontSize: '18px' }} />
                        S'inscrire
                    </button>
                    
                    <button
                        onClick={handleLearnMoreClick}
                        style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#333333';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#000000';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <FaInfoCircle style={{ fontSize: '18px' }} />
                        En savoir plus
                    </button>
                </div>
            </div>
            <Footer1 />
        </div>
    );
}

export default Home;