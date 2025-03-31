import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import ScrollIndicator from "./components/ScrollIndicator";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import SectionThree from "./components/SectionThree";

import "./index.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(true);
  const [currentSection, setCurrentSection] = useState("section1");

  const sections = useMemo(() => ["section1", "section2", "section3"], []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      let current = "section1";
      sections.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (window.scrollY >= top - height / 2) {
            current = sectionId;
          }
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="App" style={{ width: "100%" }}>
      <Navbar isScrolled={isScrolled} />
      <ScrollIndicator sections={sections} currentSection={currentSection} />

      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
}

export default App;
