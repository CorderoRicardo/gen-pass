import { useState } from 'react'
import './App.css'

function App() {
  const [pswd, setPswd] = useState('');
  const [specials, setSpecials] = useState('');
  const [pswdLength, setPswdLength] = useState(8);
  function generatePswd(specials = "", pswdLength = 8){
      let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let lowers = "abcdefghijklmnopqrstuvwxyz";
      let digits = "0123456789";
      
      let fullPswd = [];
      // add one char from each pool
      fullPswd.push(uppers[Math.floor(Math.random() * uppers.length)]);
      fullPswd.push(lowers[Math.floor(Math.random() * lowers.length)]);
      fullPswd.push(digits[Math.floor(Math.random() * digits.length)]);
      
      let allChars = uppers + lowers + digits;
      
      // if there are special chars to use
      if(specials.length > 0){
          allChars += specials;
          fullPswd.push(specials[Math.floor(Math.random() * specials.length)]);                  
      }
      // add random chars from the pool
      while(fullPswd.length < pswdLength){
          fullPswd.push(allChars[Math.floor(Math.random() * allChars.length)]);
      }

      // shuffle chars
      for(let i = fullPswd.length; i > 0 ; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [fullPswd[i], fullPswd[j]] = [fullPswd[j], fullPswd[i]];
      }
      setPswd(fullPswd.join(""));
  }

  function handleSpecials(e){
    setSpecials(e.target.value);
  }
  function handlePswdLength(e){
    if(e.target.value == '' || Number(e.target.value) > 32){
      setPswdLength(8);
      e.target.value = 8;
    } else {
      setPswdLength(e.target.value)
    }
  }

  function copyPswd(e){
    navigator.clipboard.writeText(e.target.innerHTML);
    alert("Password copied to clipboard: " + e.target.innerHTML);
  }

  return (
    <>
      <div>
        <h2>Simple Password Generator</h2>
      </div>
      <div className="card bg-indigo-500 border-2 rounded-2xl">
        <div className='mb-3 text-black font-mono flex flex-col'>
          <label className='font-bold text-blue-100 py-2'>
            Special chars: 
            <input type="text" name="specials" id="sp" onInput={handleSpecials} 
            className='bg-white rounded-[0.25rem] text-black' /> 
          </label>
          <label className='font-bold text-blue-100 py-2'>
            Length: 
            <input type="number" name="length" id="ln" onInput={handlePswdLength} min={8} max={32} 
            className='bg-white rounded-[0.25rem] text-black' /> 
          </label>          
        </div>
        <button onClick={ () => { generatePswd(specials, pswdLength)} }>
          Generate new password 
        </button>
        <p
        className='mt-4 font-bold font-mono text-black bg-blue-100 rounded-2xl text-2xl'>
          <code onClick={copyPswd}
           className='hover:cursor-pointer'>{pswd}</code>
        </p>
      </div>
    </>
  )
}

export default App
