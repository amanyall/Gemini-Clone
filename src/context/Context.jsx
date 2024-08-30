import { createContext, useState } from "react";
import run from '../config/gemini'
export const Context = createContext();

const ContextProvider = (props) => {
    // to save the input data
    const [input, setInput] = useState("");

    // after sending the data will be stored in rececnt prompt & display in main components
    const [recentPrompt, setRecentPrompt] = useState("");

    // to save in recent tabs as a history
    const [prevPrompts, setprevPrompts] = useState([]);

    // type : boolean - once its true it will hide the greeting msgs and boxes, and siplay the result
    const [showResult, setshowResult] = useState(false);

    //if this is true it will showing loading data anf after that result will be shown
    const[loading,setLoading] = useState(false);

    // to display the result on the web page
    const[resultData, setresultData] =useState("");


    const delayPara = (index, nextWord) => {

    }


    const onSent = async (prompt) => {
        setresultData("")// this will remove the previous data
        setLoading(true)
        setshowResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        let responseArray = response.split("**");
        let newResponse;
        for(let i=0; i< responseArray.length; i++)
        {
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        setresultData(newResponse2)
        setLoading(false)
        setInput("")

    }

    
    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        // newChat

    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider