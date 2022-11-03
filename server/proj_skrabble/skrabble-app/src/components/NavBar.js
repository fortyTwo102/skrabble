import React, { useContext } from "react";
import { AppContext } from "../App";

// style
import "./NavBar.css";

// components
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RestartAlt from "@mui/icons-material/RestartAlt";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import { types, Provider as AlertProvider } from "react-alert";

import HelpModal from "./HelpModel";
import AboutModal from "./AboutModal";
import {
  boardDefault,
  colorBoardDefault,
  letterStyleBoardDefault,
  mainBoardDefault,
  tallyDefault,
} from "../Initializer";
import Person from "@mui/icons-material/Person";
import { useAlert } from "react-alert";

function NavBar() {
  const { setAboutModalOpen, setHelpModalOpen, chatSocket } =
    useContext(AppContext);

  const alert = useAlert();

  const handleHelpOpen = () => setHelpModalOpen(true);
  const handleAboutOpen = () => setAboutModalOpen(true);
  const handleAgainstAI = async () => {
    if (window.location.pathname.startsWith("/ai/")) {
      window.location.replace("../../../core/");
    } else if (window.location.pathname.startsWith("/core/")) {
      window.location.replace("../../ai/core/");
    }
  };
  const handleRestart = async () => {
    // reset game states

    chatSocket.send(
      JSON.stringify({
        board: mainBoardDefault,
        tally: {
          "player-one": 0,
          "player-two": 0,
        },
        turnInProgress: false,
        cursor: [0, 0],
        wordsMade: [],
        letterCounter: 0,
        colorBoard: colorBoardDefault,
        activePlayer: {
          activePlayer: "player-one",
          board: boardDefault,
          wordsMade: [],
        },
        letterStyleBoard: letterStyleBoardDefault,
      })
    );

    alert.removeAll();
    alert.show("Game Restarted!", {
      timeout: 2000,
      type: types.INFO,
    });
  };

  return (
    <nav>
      <IconButton
        onClick={handleRestart}
        aria-label="restart"
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
        onClick={handleAgainstAI}
        aria-label="opponent"
        sx={{ color: "white", right: 27, position: "absolute" }}
      >
        {window.location.pathname.startsWith("/ai/") ? (
          <Person />
        ) : (
          <ComputerIcon />
        )}
      </IconButton>
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
