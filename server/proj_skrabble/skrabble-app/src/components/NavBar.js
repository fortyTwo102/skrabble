import React from 'react'
import './NavBar.css'

// components
import IconButton from '@mui/material/IconButton';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


function NavBar() {
    
    return (
        <nav>
          <IconButton aria-label="help" sx={{ color: "white", left:0, position: "absolute"  }}>
            <HelpOutlineOutlinedIcon/>
          </IconButton>
          <h1>skrabble.</h1>
          <IconButton aria-label="help" sx={{ color: "white", right:0, position: "absolute"  }}>
            <InfoOutlinedIcon/>
          </IconButton>
        </nav>
    )
}

export default NavBar