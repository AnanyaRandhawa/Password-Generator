import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numAllowed) str +='0123456789'
     if(charAllowed) str += "!@#$%^&*_-+=[]{}~`"

     for(let i=1;i<=length;i++){
         let char = Math.floor(Math.random()*str.length + 1) //index value
         pass +=str.charAt(char)
     }
     setPassword(pass);

  },[length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password)
  }, [password])

 useEffect(()=>{
  passwordGenerator()
 },[length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
     <div className='container'>
      <h3>Password Generator</h3>
      <div className='content'>
         <input type='text' value={password} className='input-feild' placeholder='password' readOnly ref={passwordRef}/>
         <button className='btn' onClick={copyPasswordToClipboard}>Copy</button>
      </div>

      <div className='other-factors'>
        <div className='factors-detail'>
        <input type="range" min={8} max={50} value={length} onChange={(e)=>setLength(e.target.value)}/>
        <label>Length: {length}</label>
        </div>

        <div className='factors-detail'>
         <input type="checkbox" defaultChecked={numAllowed} id="numInput" onChange={(e)=>{
          setNumAllowed((prev)=>!prev);
         }} />
         <label htmlFor="numInput">Number</label>
        </div>

        <div className='factors-detail'>
         <input type="checkbox" defaultChecked={charAllowed} id="numInput" onChange={(e)=>{
          setCharAllowed((prev)=>!prev);
         }} />
         <label htmlFor="numInput">Characters</label>
        </div>

      </div>
     </div>
    </>
  )
}

export default App
