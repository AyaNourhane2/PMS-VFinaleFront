import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import coverPhoto from "../asset/image-hotel.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employer");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Liste des comptes spéciaux avec leurs redirections
  const specialAccounts = {
    "RoyelStayEmp@gmail.com": {
      password: "RoyelstayEmp##",
      role: "employer",
      redirect: "/employee",  // Modifié pour correspondre à la route dans App.js
      message: "Connexion employé réussie !"
    },
    "RoyelstayAd@gmail.com": {
      password: "RoyelStayA##",
      role: "admin",
      redirect: "/admin-dashboard",
      message: "Connexion administrateur réussie !"
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email est requis";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email invalide";
    if (!password) errors.password = "Mot de passe requis";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Vérification des comptes spéciaux
    if (specialAccounts[email]) {
      if (password === specialAccounts[email].password) {
        const account = specialAccounts[email];
        
        sessionStorage.setItem("authToken", "special-token-" + account.role);
        sessionStorage.setItem("userRole", account.role);
        sessionStorage.setItem("userEmail", email);
        
        toast.success(account.message);
        setIsLoading(false);
        navigate(account.redirect);
        return;
      } else {
        toast.error("Mot de passe incorrect pour ce compte spécial");
        setIsLoading(false);
        return;
      }
    }

    // Pour les autres utilisateurs
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        
        sessionStorage.setItem("authToken", response.data.token);
        sessionStorage.setItem("userRole", response.data.user.role);
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
        
        // Redirection selon le rôle
        switch(response.data.user.role.toLowerCase()) {
          case 'admin':
            navigate("/admin-dashboard");
            break;
          case 'employer':
            navigate("/employee");  // Route corrigée pour correspondre à App.js
            break;
          case 'user':
            navigate("/homeScreen");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error(response.data.message || "Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isSpecialAccount = specialAccounts[email];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}>
        <div style={styles.loginContainer}>
          <h2 style={styles.title}>Bienvenue de retour !</h2>
          <form onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                disabled={isLoading}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            {/* Champ Mot de passe */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                disabled={isLoading}
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>

            {/* Champ Rôle */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Rôle</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.inputField}
                disabled={isSpecialAccount || isLoading}
              >
                <option value="user">Utilisateur</option>
                <option value="employer">Employé</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            {isSpecialAccount && (
              <div style={styles.specialNote}>
                Compte spécial - Rôle automatiquement sélectionné
              </div>
            )}

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading && styles.buttonDisabled)
              }}
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p style={styles.linkText}>
            Pas de compte ? <Link to="/signup" style={styles.link}>S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${coverPhoto})`,
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
 loginContainer: {
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

export default Login;