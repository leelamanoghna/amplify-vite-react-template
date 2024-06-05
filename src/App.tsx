 import { Authenticator } from '@aws-amplify/ui-react'
 import '@aws-amplify/ui-react/styles.css'
import { useState } from "react";

function App(){
  const [mail, setmail] = useState('');
  const [subject, setsubject] = useState('');
  const [body, setbody] = useState('');  
  const handlemailChange = (event:any) => {
    setmail(event.target.value)
  }
  const handlesubjectChange = (event:any) =>{
    setsubject(event.target.value)
  }
  const handlebodyChange = (event:any) => {
    setbody(event.target.value)
  }
    const handleSubmit = async (event:any) =>{
      event.preventDefault();
      const details ={
        mail:mail,
        subject: subject,
        body:body
      };
      fetch("https://e2vp4vowjh.execute-api.us-east-1.amazonaws.com/test/", {
        method : 'POST',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify(details),
      })
      if(details){
        alert("Mail sent successfully");
        App();
      }
      else{
        alert("Error posting details")
      }
    } 
  function clearform(){ 
  }
  return (
    <Authenticator>
      {({ signOut, user }) => (
    <main>
      <h2>{user?.signInDetails?.loginId}'s form</h2>
      <h1>Form to send mail using SES</h1>
      <form>
        <div className="email">
          <label htmlFor="mail" className='email'>Email:</label><br/>
          <input className="itsmail" id="mail" value={mail} onChange={handlemailChange} type="text"></input>
        </div><br/>
        <div className="Subject">
          <label htmlFor="subject" className='subject'>Subject:</label><br/>
          <input className ="itssubject" id="subject" value={subject} onChange={handlesubjectChange} type="text"></input>
        </div><br/>
        <div className="mailtext">
          <label htmlFor="body">Text to be sent in mail:</label><br/>
          <textarea className= "itsbody" id="body" value={body} onChange={handlebodyChange}></textarea>
        </div><br/>
        <div className="Buttons">
          <button type="submit" onClick = {handleSubmit}>Submit</button>
          <button type="submit" onClick={clearform}>Cancel</button>
        </div>
      </form><br/>
      <button type="submit" className="signout" onClick={signOut}>Sign out</button>
    </main>
    )}
    </Authenticator>
  );
}
export default App;
