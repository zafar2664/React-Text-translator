import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function Translator() {

  const[userInput , setUserInput] = useState("");
  const[languages,setLanguages] = useState([]);
  const[sourceLanguage , setSourceLanguage] = useState("");
  const[destinationLanguage , setDestinationLanguage] = useState("");
  const[translatedText , setTranslatedText] = useState("");

  async function fetchData(){
     const response = await fetch("https://text-translator2.p.rapidapi.com/getLanguages",{
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'e806a6f38cmsh3be995132d4f327p1cf72fjsn2908cf23eec5',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      }
     });

    const result = await response.json();
     setLanguages(result.data.languages);
  }

  async function translateData(data){
    let response = await fetch("https://text-translator2.p.rapidapi.com/translate",{
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'e806a6f38cmsh3be995132d4f327p1cf72fjsn2908cf23eec5',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
      body: data
    });
    let results = await response.json();
    setTranslatedText(results.data.translatedText);

    
  }
  function translateText(){
    if(userInput === ''){
      alert("input field is required !!")
      return;
    }
   const data = new FormData();
   data.append("source_language", sourceLanguage);
   data.append("target_language", destinationLanguage);
   data.append("text", userInput);
    translateData(data);
    setUserInput("");
    setSourceLanguage("");
    setDestinationLanguage("")

  }

  useEffect(()=>{
    fetchData();
  },[])



  return (
    <>
      <div className="container">
        <h2>Language Translation </h2>

        <TextField id="outlined-basic" label="Write Text" variant="outlined"  style={{width:"100%" , margin:"1rem 0rem"}}
          value={userInput} onChange={(e)=>{setUserInput(e.currentTarget.value)}} required
        />

        <div className="option-container">
          <div className="options">
            <p>Input Language</p>
            <select  onChange={(e)=>{setSourceLanguage(e.currentTarget.value)}}>
            <option value="select language" >Select Language</option>
              {languages.map((item,index)=>{
                return <option key={index} value={item.code}>{item.name}</option>
              })}
            </select>
          </div>
          <div className="options">
            <p>Output Language</p>
            <select onChange={(e)=>{setDestinationLanguage(e.currentTarget.value)}}>
            <option value="selected language"  >Select Language</option>
            {languages.map((item,index)=>{
                return <option key={index} value={item.code}>{item.name}</option>
              })}
            </select>
          </div>
        </div>

        <button onClick={(e)=>{translateText()}}>Translate</button>

        {translatedText.length > 0 ? 
      <div className="output-container">
         <p className="head">Translated Text:</p>
         <p className="trans">{translatedText}</p>
      </div> :""}
      </div>

  
    </>
  );
}

export default Translator;