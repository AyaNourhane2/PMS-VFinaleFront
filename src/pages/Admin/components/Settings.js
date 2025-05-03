import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    jointTitle: 'Joint Title',
    location: '',
    businessName: '',
    email: '',
    phone: '',
    fax: '',
    address: '',
    country: '',
    city: '',
    postcode: '',
    state: '',
    website: '',
    taxID: '',
    industry: '',
    employees: '',
    foundedYear: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      socialMedia: {
        ...userInfo.socialMedia,
        [name]: value
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises:', userInfo, profileImage);
    alert('Paramètres mis à jour avec succès!');
  };

  return (
    <div className="settings-container">
      <h1>Paramètres du compte</h1>
      
      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Informations générales
        </button>
        <button 
          className={`tab-button ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          Réseaux sociaux
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'general' && (
          <>
            <div className="profile-picture-section">
              <h2>Photo de profil</h2>
              <div className="profile-picture-container">
                <div className="profile-info">
                  <h3>{userInfo.name}</h3>
                  <div className="input-group">
                    <input
                      type="text"
                      name="jointTitle"
                      value={userInfo.jointTitle}
                      onChange={handleInputChange}
                      placeholder="Titre"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="location"
                      value={userInfo.location}
                      onChange={handleInputChange}
                      placeholder="Localisation"
                    />
                  </div>
                </div>
                <div className="image-upload-container">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile Preview" className="profile-preview" />
                  ) : (
                    <div className="profile-placeholder">
                      <span>Aucune image</span>
                    </div>
                  )}
                  <div className="image-actions">
                    <label className="upload-button">
                      Télécharger une photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={handleDeleteImage}
                      disabled={!imagePreview}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="organization-section">
              <h2>Informations de l'organisation</h2>
              <div className="form-row">
                <div className="input-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="businessName"
                    value={userInfo.businessName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Fax</label>
                  <input
                    type="text"
                    name="fax"
                    value={userInfo.fax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Site web</label>
                  <input
                    type="url"
                    name="website"
                    value={userInfo.website}
                    onChange={handleInputChange}
                    placeholder="https://"
                  />
                </div>
                <div className="input-group">
                  <label>Numéro de TVA</label>
                  <input
                    type="text"
                    name="taxID"
                    value={userInfo.taxID}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Pays</label>
                  <input
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={userInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Code postal</label>
                  <input
                    type="text"
                    name="postcode"
                    value={userInfo.postcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Région</label>
                  <input
                    type="text"
                    name="state"
                    value={userInfo.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Secteur d'activité</label>
                  <input
                    type="text"
                    name="industry"
                    value={userInfo.industry}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label>Nombre d'employés</label>
                  <input
                    type="number"
                    name="employees"
                    value={userInfo.employees}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Année de création</label>
                <input
                  type="number"
                  name="foundedYear"
                  value={userInfo.foundedYear}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <div className="social-media-section">
            <h2>Réseaux sociaux</h2>
            <div className="input-group">
              <label>Facebook</label>
              <input
                type="url"
                name="facebook"
                value={userInfo.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                placeholder="https://facebook.com/votre-page"
              />
            </div>
            <div className="input-group">
              <label>Twitter</label>
              <input
                type="url"
                name="twitter"
                value={userInfo.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                placeholder="https://twitter.com/votre-compte"
              />
            </div>
            <div className="input-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={userInfo.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
                placeholder="https://linkedin.com/in/votre-profil"
              />
            </div>
            <div className="input-group">
              <label>Instagram</label>
              <input
                type="url"
                name="instagram"
                value={userInfo.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                placeholder="https://instagram.com/votre-compte"
              />
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="save-button">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;