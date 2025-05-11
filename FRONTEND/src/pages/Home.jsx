import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";


const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to CuraWell Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"doctor.jpg"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
      
    </>
  );
};

export default Home;