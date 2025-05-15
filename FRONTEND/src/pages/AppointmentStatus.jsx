import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const statusStyles = {
  Accepted: { color: "#16a34a", fontWeight: "bold" },
  Rejected: { color: "#dc2626", fontWeight: "bold" },
  Pending: { color: "#eab308", fontWeight: "bold" },
};

const statusMessages = {
  Accepted: "Your appointment is accepted.",
  Rejected: "Your appointment is rejected.",
  Pending: "Your appointment is pending.",
};

const AppointmentStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useContext(Context); // Added user here

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/appointment/my-appointments",
          { 
            withCredentials: true
          }
        );
        setAppointments(data.appointments);
      } catch (error) {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        toast.error(error.response?.data?.message || "Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
  
    if (isAuthenticated) {
      fetchUserAppointments();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <section className="page" style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>Loading appointments...</div>
      </section>
    );
  }

  return (
    <div style={{ padding: "20px", marginBottom: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Your Appointment Status</h2>
      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No previous appointments found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {appointments.map((appointment) => (
            <div 
              key={appointment._id} 
              style={{ 
                margin: "10px 0", 
                padding: "20px", 
                borderRadius: "10px", 
                background: "#fff", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
                width: "100%", 
                maxWidth: "500px",
                textAlign: "center" 
              }}
            >
              <div style={statusStyles[appointment.status] || {}}>
                {statusMessages[appointment.status] || "Unknown status"}
              </div>
              <div style={{ marginTop: "15px", color: "#555" }}>
                <p>Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
                <p>Doctor: {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                <p>Department: {appointment.department}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentStatus;