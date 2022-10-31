import React, { useContext } from "react";
import { AppContext } from "../App";

// components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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

function AboutModal() {
  const { setAboutModalOpen, aboutModalOpen } = useContext(AppContext);

  const handleAboutClose = () => setAboutModalOpen(false);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <Modal
        open={aboutModalOpen}
        onClose={handleAboutClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>About</h2>
            <p>Hi, I am Farooq Ansari. Look me up.</p>
            <br />
          </div>
          <h4>Public Profiles:</h4>
          <p>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "white"
              }}
              onClick={() => openInNewTab("https://github.com/fortyTwo102/")}
              startIcon={<GitHubIcon />}
            >
              GITHUB
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "white"
              }}
              onClick={() => openInNewTab("https://in.linkedin.com/in/farooqans4ri")}
              startIcon={<LinkedInIcon />}
            >
              LINKEDIN
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "white"
              }}
              onClick={() => openInNewTab("https://instagram.com/paperorchestra/")}
              startIcon={<InstagramIcon />}
            >
              INSTAGRAM
            </Button>
          </p>
          <h4>Mail me at:</h4>
          <p>farooq73a@gmail.com</p>
          <h4>Happy Skrabbling!</h4>
        </Box>
      </Modal>
    </div>
  );
}

export default AboutModal;
