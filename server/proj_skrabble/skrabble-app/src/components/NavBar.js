import React, { useContext } from "react";
import { AppContext } from "../App";

// style
import "./NavBar.css";

// components
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestartAlt from "@mui/icons-material/RestartAlt";

import HelpModal from "./HelpModel";
import AboutModal from "./AboutModal";

function NavBar() {
  const { setAboutModalOpen, setHelpModalOpen } = useContext(AppContext);

  const handleHelpOpen = () => setHelpModalOpen(true);
  const handleAboutOpen = () => setAboutModalOpen(true);
  const handleRestart = () => window.location.replace("../");

  return (
    <nav>
      <IconButton
        onClick={handleRestart}
        aria-label="help"
        sx={{ color: "white", left: 24, position: "absolute" }}
      >
        <RestartAlt />
      </IconButton>
      <IconButton
        onClick={handleHelpOpen}
        aria-label="help"
        sx={{ color: "white", left: 0, position: "absolute" }}
      >
        <HelpOutlineOutlinedIcon />
      </IconButton>
      <HelpModal />
      <h1>skrabble.</h1>
      <IconButton
        onClick={handleAboutOpen}
        aria-label="about"
        sx={{ color: "white", right: 0, position: "absolute" }}
      >
        <InfoOutlinedIcon />
      </IconButton>
      <AboutModal />
    </nav>
  );
}

export default NavBar;
