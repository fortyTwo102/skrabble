import React from 'react'
import Key from './Key'
import './Keyboard.css'

import Button from '@mui/material/Button';  
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { useAlert } from 'react-alert'
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'


function Keyboard() {

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const state = {
        "value": "",
        "copied": false,
    }

    const url = window.location.href
    const alert = useAlert()

    return (
            <div className='keyboard'>
                <div className='line1'>
                    {keys1.map((key) => {
                        return <Key keyVal={key} />
                    })}
                </div>
                <div className='line2'>
                    {keys2.map((key) => {
                        return <Key keyVal={key} />
                    })}
                </div>
                <div className='line3'>
                    <Key keyVal="Enter" bigKey />
                    {keys3.map((key) => {
                        return <Key keyVal={key} />
                    })}
                    <Key keyVal="Delete" bigKey />
                </div>
                <CopyToClipboard text={url}
                    onCopy={() => alert.success("Copied!", {
                        timeout: 1000
                    })}>
                    <Button variant="contained" color="success" size="small" style={{maxWidth: '180px', maxHeight: '20px', minWidth: '180px', minHeight: '20px'}}>Copy Link to Room</Button>
                </CopyToClipboard> 
            </div>
    )
}

export default Keyboard;