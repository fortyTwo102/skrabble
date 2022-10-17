import { useState } from "react";
import EndpointCall from "./EndpointCall";

export function IsEnglishWord(word) {

    const { wordResult, setWordResult } = useState(false)

    let apiObj = new EndpointCall()
    let apiResp = apiObj.callApi(word)
      .then(res => console.log(res.result))
      .catch(err => console.log(err));

    console.log("result for " + word + " is " + wordResult)
    return wordResult

}