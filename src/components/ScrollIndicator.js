import React from "react";

const ScrollIndicator = ({ sections, currentSection }) => {
  const handleClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scroll-indicator">
      {sections.map((sectionId) => (
        <div
          key={sectionId}
          className={`scroll-dot ${
            currentSection === sectionId ? "active" : ""
          }`}
          onClick={() => handleClick(sectionId)}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;
