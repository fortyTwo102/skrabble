import { useContext } from "react";
import { AppContext } from "../App";

export default async function CallAPI (word) {

    const {wordResult, setWordResult} = useContext(AppContext)

    response = await fetch(`http://localhost:3001/api/checkWord?q=${word.toLowerCase()}`);
    let body = await response.json()

    if (response.status !== 200) throw Error(body.message);
    
    console.log(body)
    setWordResult(body)
}