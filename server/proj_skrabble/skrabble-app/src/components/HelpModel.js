import React, { useContext } from 'react'
import { AppContext } from '../App'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 40,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HelpModal() {
  
  const { setHelpModalOpen, helpModalOpen} = useContext(AppContext)

  const handleHelpOpen = () => setHelpModalOpen(true);
  const handleHelpClose = () => setHelpModalOpen(false);

  return (
    <div>
    <Modal
        open={helpModalOpen}
        onClose={handleHelpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        </Box>
    </Modal>
    </div>
  );
}

export default HelpModal;
