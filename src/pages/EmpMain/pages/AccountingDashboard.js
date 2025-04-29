import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaReceipt,
  FaPlus,
  FaTrash,
  FaFileExport,
  FaSearch,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar"; // Chemin ajusté
import profilecomptable from "../assets/profilecompatible.webp";
import "../Style/accounting.css";

// Constantes pour les options de sélection
const PAYMENT_METHODS = [
  "Espèce",
  "Carte bancaire",
  "Virement bancaire",
  "Portefeuille électronique",
  "Chèque",
  "Paiement à l'arrivée",
  "Paiement en ligne",
];

const STATUS_OPTIONS = ["payé", "en attente"];

const AccountingDashboard = () => {
  const [activeSection, setActiveSection] = useState("payments");
  const navigate = useNavigate();

  // États pour les données
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [taxPayments, setTaxPayments] = useState([]);

  // États pour les nouveaux éléments
  const [newPayment, setNewPayment] = useState({ client: "", amount: "", paymentMethod: "" });
  const [newInvoice, setNewInvoice] = useState({ client: "", amount: "" });
  const [newTax, setNewTax] = useState({ type: "", amount: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/accounting/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await axios.get('/api/accounting/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    const fetchTaxes = async () => {
      try {
        const response = await axios.get('/api/accounting/taxes');
        setTaxPayments(response.data);
      } catch (error) {
        console.error('Error fetching taxes:', error);
      }
    };

    fetchPayments();
    fetchInvoices();
    fetchTaxes();
  }, []);

  const addPayment = async () => {
    if (newPayment.client && newPayment.amount && newPayment.paymentMethod) {
      try {
        const response = await axios.post('/api/accounting/', {
          entry_type: 'payment',
          client_name: newPayment.client,
          amount: parseFloat(newPayment.amount),
          payment_method: newPayment.paymentMethod,
          status: 'pending',
          created_by: 1 // Replace with actual user ID
        });
        setPayments([...payments, response.data]);
        setNewPayment({ client: "", amount: "", paymentMethod: "" });
      } catch (error) {
        console.error('Error adding payment:', error);
        let errorMessage = 'Unknown error';
        if (error.response) {
          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else {
            errorMessage = error.response.statusText;
          }
        } else if (error.request) {
          errorMessage = error.request.statusText;
        } else {
          errorMessage = error.message;
        }
        alert(`Error adding payment: ${errorMessage}`);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addInvoice = async () => {
    if (newInvoice.client && newInvoice.amount) {
      try {
        const response = await axios.post('/api/accounting/', {
          entry_type: 'invoice',
          client_name: newInvoice.client,
          amount: parseFloat(newInvoice.amount),
          status: 'en attente',
          created_by: 1 // Replace with actual user ID
        });
        setInvoices([...invoices, response.data]);
        setNewInvoice({ client: "", amount: "" });
      } catch (error) {
        console.error('Error adding invoice:', error);
        let errorMessage = 'Unknown error';
        if (error.response) {
          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else {
            errorMessage = error.response.statusText;
          }
        } else if (error.request) {
          errorMessage = error.request.statusText;
        } else {
          errorMessage = error.message;
        }
        alert(`Error adding invoice: ${errorMessage}`);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const addTax = async () => {
    if (newTax.type && newTax.amount) {
      try {
        const response = await axios.post('/api/accounting/', {
          entry_type: 'tax',
          type: newTax.type,
          amount: parseFloat(newTax.amount),
          status: 'en attente',
          created_by: 1 // Replace with actual user ID
        });
        setTaxPayments([...taxPayments, response.data]);
        setNewTax({ type: "", amount: "" });
      } catch (error) {
        console.error('Error adding tax:', error);
        let errorMessage = 'Unknown error';
        if (error.response) {
          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else {
            errorMessage = error.response.statusText;
          }
        } else if (error.request) {
          errorMessage = error.request.statusText;
        } else {
          errorMessage = error.message;
        }
        alert(`Error adding tax: ${errorMessage}`);
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`/api/accounting/${id}`);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Error deleting payment');
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`/api/accounting/${id}`);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice');
    }
  };

  const deleteTax = async (id) => {
    try {
      await axios.delete(`/api/accounting/${id}`);
      setTaxPayments(taxPayments.filter(tax => tax.id !== id));
    } catch (error) {
      console.error('Error deleting tax:', error);
      alert('Error deleting tax');
    }
  };

  const updateInvoiceStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/accounting/${id}/status`, { status: newStatus });
      setInvoices(invoices.map(invoice => 
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      ));
    } catch (error) {
      console.error('Error updating invoice status:', error);
      alert('Error updating invoice status');
    }
  };

  const updateTaxStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/accounting/${id}/status`, { status: newStatus });
      setTaxPayments(taxPayments.map(tax => 
        tax.id === id ? { ...tax, status: newStatus } : tax
      ));
    } catch (error) {
      console.error('Error updating tax status:', error);
      alert('Error updating tax status');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset à la première page lors d'une nouvelle recherche
  };

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleExport = (items, fileName) => {
    const csvContent = "data:text/csv;charset=utf-8," + items.map(item => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
    navigate("/employee"); // Rediriger vers la page d'accueil
  };

  const filteredPayments = payments.filter(payment =>
    payment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice =>
    invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTaxes = taxPayments.filter(tax =>
    tax.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tax.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="comptableService">
      <Sidebar
        buttons={[
          { name: "Payments", icon: <FaMoneyCheckAlt /> },
          { name: "Invoices", icon: <FaFileInvoiceDollar /> },
          { name: "Taxes", icon: <FaReceipt /> },
        ]}
        onButtonClick={(buttonName) => setActiveSection(buttonName.toLowerCase().replace(/ /g, "_"))}
        activeButton={activeSection}
        onLogout={handleLogout}
        dashboardName="ServiSync"
        profileImage={profilecomptable}
      />

      <div className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        {activeSection === "payments" && (
          <PaymentSection
            payments={paginate(filteredPayments)}
            newPayment={newPayment}
            setNewPayment={setNewPayment}
            addPayment={addPayment}
            deletePayment={deletePayment}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredPayments.length / itemsPerPage)}
          />
        )}

        {activeSection === "invoices" && (
          <InvoiceSection
            invoices={paginate(filteredInvoices)}
            newInvoice={newInvoice}
            setNewInvoice={setNewInvoice}
            addInvoice={addInvoice}
            deleteInvoice={deleteInvoice}
            updateInvoiceStatus={updateInvoiceStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredInvoices.length / itemsPerPage)}
            handleExport={() => handleExport(invoices, "invoices")}
          />
        )}

        {activeSection === "taxes" && (
          <TaxSection
            taxes={paginate(filteredTaxes)}
            newTax={newTax}
            setNewTax={setNewTax}
            addTax={addTax}
            deleteTax={deleteTax}
            updateTaxStatus={updateTaxStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredTaxes.length / itemsPerPage)}
            handleExport={() => handleExport(taxPayments, "taxes")}
          />
        )}
      </div>
    </div>
  );
};

// Composant pour la section des paiements
const PaymentSection = ({
  payments,
  newPayment,
  setNewPayment,
  addPayment,
  deletePayment,
  currentPage,
  setCurrentPage,
  totalPages,
}) => (
  <section className="section">
    <h2 className="heading">Paiements</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Nom du client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Mode de paiement</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.client_name}</td>
            <td>{payment.amount} €</td>
            <td>{payment.date}</td>
            <td>{payment.payment_method}</td>
            <td>
              <button className="button danger" onClick={() => deletePayment(payment.id)}>
                <FaTrash /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <div className="form">
      <input
        type="text"
        placeholder="Nom du client"
        value={newPayment.client}
        onChange={(e) => setNewPayment({ ...newPayment, client: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newPayment.amount}
        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
        className="input"
      />
      <select
        value={newPayment.paymentMethod}
        onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
        className="input"
      >
        <option value="">Choisir un mode de paiement</option>
        {PAYMENT_METHODS.map((method, index) => (
          <option key={index} value={method}>
            {method}
          </option>
        ))}
      </select>
      <button className="button" onClick={addPayment}>
        <FaPlus /> Ajouter un paiement
      </button>
    </div>
  </section>
);

// Composant pour la section des factures
const InvoiceSection = ({
  invoices,
  newInvoice,
  setNewInvoice,
  addInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  currentPage,
  setCurrentPage,
  totalPages,
  handleExport,
}) => (
  <section className="section">
    <h2 className="heading">Factures</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Nom du client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.client_name}</td>
            <td>{invoice.amount} €</td>
            <td>{invoice.date}</td>
            <td>
              <select
                value={invoice.status}
                onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                className="input"
              >
                {STATUS_OPTIONS.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="button danger" onClick={() => deleteInvoice(invoice.id)}>
                <FaTrash /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <div className="form">
      <input
        type="text"
        placeholder="Nom du client"
        value={newInvoice.client}
        onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newInvoice.amount}
        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
        className="input"
      />
      <button className="button" onClick={addInvoice}>
        <FaPlus /> Ajouter une facture
      </button>
    </div>
  </section>
);

// Composant pour la section des taxes
const TaxSection = ({
  taxes,
  newTax,
  setNewTax,
  addTax,
  deleteTax,
  updateTaxStatus,
  currentPage,
  setCurrentPage,
  totalPages,
  handleExport,
}) => (
  <section className="section">
    <h2 className="heading">Taxes</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {taxes.map((tax) => (
          <tr key={tax.id}>
            <td>{tax.type}</td>
            <td>{tax.amount} €</td>
            <td>{tax.date}</td>
            <td>
              <select
                value={tax.status}
                onChange={(e) => updateTaxStatus(tax.id, e.target.value)}
                className="input"
              >
                {STATUS_OPTIONS.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button className="button danger" onClick={() => deleteTax(tax.id)}>
                <FaTrash /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <div className="form">
      <input
        type="text"
        placeholder="Type de taxe"
        value={newTax.type}
        onChange={(e) => setNewTax({ ...newTax, type: e.target.value })}
        className="input"
      />
      <input
        type="number"
        placeholder="Montant"
        value={newTax.amount}
        onChange={(e) => setNewTax({ ...newTax, amount: e.target.value })}
        className="input"
      />
      <button className="button" onClick={addTax}>
        <FaPlus /> Ajouter une taxe
      </button>
    </div>
  </section>
);

export default AccountingDashboard;