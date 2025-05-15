import React, { useContext } from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentStatus from "../pages/AppointmentStatus";
import { Context } from "../main";

const Appointment = () => {
  const { isAuthenticated } = useContext(Context);

  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      {isAuthenticated && <AppointmentStatus />}
      <AppointmentForm />
    </>
  );
};

export default Appointment;