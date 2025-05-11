import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          CuraWell Medical Institute is a modern healthcare facility committed to delivering high-quality, patient-centered medical services. With a team of experienced professionals and advanced infrastructure, we provide efficient, personalized care designed to meet the diverse needs of our patients. At CuraWell, your health is our priority — we strive to ensure a seamless and compassionate healthcare experience.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;