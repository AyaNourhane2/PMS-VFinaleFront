import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImage1 from '../asset/img1.jpg';
import coverImage2 from '../asset/img2.jpg';
import coverImage3 from '../asset/image2.jpg';
import Footer1 from '../components/footer'; // Importez le composant Footer1

function Home() {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);

    const images = [coverImage1, coverImage2, coverImage3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change d'image toutes les 5 secondes

        return () => clearInterval(interval);
    }, [images.length]);

    // Styles pour les boutons (couleurs harmonisées avec les photos)
    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent
        color: '#333', // Texte foncé pour contraster
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    };

    const handleLearnMoreClick = () => {
        navigate('/plus-information');
    };

    

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
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                Bienvenue à RoyalStay, où le luxe rencontre le confort pour une expérience de séjour exceptionnelle. Profitez de nos services haut de gamme et de notre ambiance chaleureuse pour un moment inoubliable. Nous vous souhaitons un excellent séjour !
                </h3>

                {/* Boutons avec nouveau style */}
                <div>
                    <button 
                        onClick={handleLearnMoreClick} 
                        style={buttonStyle}
                    >
                        Learn More
                    </button>

                  
                </div>
            </div>
            <Footer1 /> {/* Ajoutez le composant Footer1 ici */}
        </div>
    );
}

export default Home;