import React, { useContext } from "react";
import { AppContext } from "../App";
import "./WordHistoryModal.css";

// components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  fontFamily: "Century Gothic, serif",
  borderRadius: "10px!important",
  overflow: "scroll",
  overflowX: "hidden",
};

function WordHistoryModal() {
  const {
    setWordHistoryModalOpen,
    wordHistoryModalOpen,
    wordsMade,
  } = useContext(AppContext);

  const handleWordHistoryClose = () => setWordHistoryModalOpen(false);

  var wordRows = [];
  wordsMade.forEach((wordMade) => {
    var wordMadeJSON = JSON.parse(wordMade);
    if (wordMadeJSON["player"] === "player-one") {
      wordRows.push(
        <li style={{ color: "#219ebc" }}>{wordMadeJSON["word"]}</li>
      );
    } else if (wordMadeJSON["player"] === "player-two") {
      wordRows.push(
        <li style={{ color: "#ffb703" }}>{wordMadeJSON["word"]}</li>
      );
    }
  });

  return (
    <div>
      <Modal
        open={wordHistoryModalOpen}
        onClose={handleWordHistoryClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>Game History</h2>
            <p>
              Each word is colored in the color of the Player who played it.
            </p>
            <br />
            <ul>{wordRows}</ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default WordHistoryModal;
