import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import coverImage from "../asset/image-hotel.webp";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    role: "user"
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formValues.username) errors.username = "Nom d'utilisateur requis";
    if (!formValues.email) errors.email = "Email requis";
    if (!formValues.mobile) errors.mobile = "Téléphone requis";
    if (!formValues.password) errors.password = "Mot de passe requis";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Envoi des données:", formValues); // Debug
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formValues
      );

      console.log("Réponse du serveur:", response.data); // Debug

      if (response.data.success) {
        toast.success("Inscription réussie !");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || 
        "Erreur lors de la connexion au serveur"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Effacer l'erreur quand l'utilisateur corrige
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <div style={styles.signUpContainer}>
          <h2 style={styles.title}>Inscription</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                style={styles.inputField}
              />
              {formErrors.username && (
                <span style={styles.error}>{formErrors.username}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                style={styles.inputField}
              />
              {formErrors.email && (
                <span style={styles.error}>{formErrors.email}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Téléphone</label>
              <input
                type="text"
                name="mobile"
                value={formValues.mobile}
                onChange={handleChange}
                style={styles.inputField}
              />
              {formErrors.mobile && (
                <span style={styles.error}>{formErrors.mobile}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                style={styles.inputField}
              />
              {formErrors.password && (
                <span style={styles.error}>{formErrors.password}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Rôle</label>
              <select
                name="role"
                value={formValues.role}
                onChange={handleChange}
                style={styles.inputField}
              >
                <option value="user">Utilisateur</option>
                <option value="employer">Employé</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "En cours..." : "S'inscrire"}
            </button>
          </form>

          <p style={styles.loginLink}>
            Déjà inscrit? <Link to="/login" style={styles.link}>Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles - identiques à votre version originale
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  signUpContainer: {
    width: "360px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.22))",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    color: "rgb(0, 0, 0)",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "rgb(8, 8, 8)",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.3s ease-in-out",
    background: "#ffffff",
    color: "#000",
    marginBottom: "15px",
  },
  inputFieldFocus: {
    boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.5)",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "rgb(128, 128, 128)",
    color: "rgba(8, 8, 8, 0.99)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    marginTop: "15px",
  },
  toggleLink: {
    marginTop: "15px",
    textAlign: "center",
    color: "#000",
    fontSize: "14px",
  },
  link: {
    color: "rgb(8, 8, 8)",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

export default SignUp;