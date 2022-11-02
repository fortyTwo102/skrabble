import React, { useContext } from "react";
import { AppContext } from "../App";

// components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Person from "@mui/icons-material/Person";
import Computer from "@mui/icons-material/Computer";
import RestartAlt from "@mui/icons-material/RestartAlt";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: "300px",
  transform: "translate(-50%, -50%)",
  bgcolor: "black",
  boxShadow: 24,
  padding: "15px",
  height: "400px",
  color: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
  borderRadius: "10px!important",
  overflow: "scroll",
  overflowX: "hidden",
};

function HelpModal() {
  const { setHelpModalOpen, helpModalOpen } = useContext(AppContext);

  const handleHelpOpen = () => setHelpModalOpen(true);
  const handleHelpClose = () => setHelpModalOpen(false);

  return (
    <Modal
      open={helpModalOpen}
      onClose={handleHelpClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <h2>How To Play</h2>
          <p>Make as many words as you can.</p>
          <br />
        </div>
        <h4>Starting A Game</h4>
        <p>
          <ul>
            <li>Skrabble is a two player game.</li>
            <li>
              If you are the first person to join, copy and share the link to
              the Game Room using the green 'COPY LINK TO ROOM' button with the
              person you want to play with.
            </li>
            <li>
              To start a game, enter a letter (e.g. 'A' or 'I') and press
              "ENTER".
            </li>
            <li>
              You will be assigned the color you play as at start of play.
              Either Blue or Orange.
            </li>
            <li>
              Here is what the buttons on the navigation bar stand for:
              <br />
              <br />
              <br />
              <p>
                <Computer /> Icon on top-right means that you are playing
                against a person in a one-to-one battle. You can click on it if
                you want to play against an AI.
              </p>
              <br />
              <br />
              <p>
                <Person /> Icon on top-right means that you are playing against
                an AI. You can click on it if you want to play against a person.
              </p>
              <br />
              <br />
              <p>
                <RestartAlt /> Icon on top-left can be clicked on to RESTART the
                game.
              </p>
              <br />
              <br />
              <p>
                <HelpOutlineOutlined /> Icon on top-left is to open the HELP
                section.
              </p>
              <br />
              <br />
              <p>
                <InfoOutlined /> Icon on top-right is to open the ABOUT section.
              </p>
              <br />
            </li>
            <br />
            <br />
            <li>
              If the Game Room is full, you will be joined as an Observer.
            </li>
          </ul>
        </p>
        <h4>Gameplay</h4>
        <p>
          <ul>
            <li>
              The points will be awarded for each valid word ending at the
              letter you play
            </li>
            <br />
            <h4>Example</h4>
            <img
              src={require("../images/how-to-play-example.png")}
              height="132"
              width="220"
              alt="It is a picture where words are made horizontally and vertically."
            />
            <br />
            <p>
              Here, +5 points are awarded to Player Orange for 'Ad' and 'Ode',
              and +5 to Player Blue for 'Ton' and 'On'.
            </p>
            <br />
            <br />
            <br />
            <li>You can be awarded points for multiple words at once.</li>
            <li>
              The players can play only one letter at a time, alternatively.
            </li>
            <li>
              When all of the boxes are played, the player with the most points
              win.
            </li>
            <li>
              In case of dispute, you can check the validity of the word{" "}
              <a
                href="https://scrabblecheck.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#7EC8E3" }}
              >
                here
              </a>
              .
            </li>
          </ul>
        </p>
        <h4>Happy Skrabbling!</h4>
      </Box>
    </Modal>
  );
}

export default HelpModal;
