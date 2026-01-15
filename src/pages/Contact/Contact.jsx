import { useState } from "react"
import "./Contact.css"

export default function Contact(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    function validate({ name, email, message }){
        let errorMessage = ""
        if (name.trim().length < 3){
            errorMessage = "Name is too short"
        }
        if (name.length > 30){
            errorMessage = "Name is too long"
        } 
        if (email.trim().length < 3){
            errorMessage = "email is too short"
        }
        if (email.length > 30){
            errorMessage = "email is too long"
        } 
        if (message.trim().length < 3){
            errorMessage = "Message is too short"
        }
        if (message.length > 30){
            errorMessage = "Message is too long"
        } 
        setErrorMessage(errorMessage) 

    }

    function handleSubmit(e){
        e.preventDefault()
        if (errorMessage !== ""){
            return
        }

        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, message: message })
        })

        setErrorMessage("")
        setName("")
        setEmail("")
        setMessage("")

        alert("Success")
    }

    return (
    <div>
        <h1>Contact</h1>
        <form className="form" >
            {errorMessage !== "" && <p>{errorMessage}</p>}
            <label>Name</label>
            <input value={name} onChange={e => {setName(e.target.value); validate({name: e.target.value, email: email, message: message }) }} />
            <label>Email</label>
            <input value={email} onChange={e => {setEmail(e.target.value); validate({name: name, email: e.target.value, message: message })}} />
            <label>Message</label>
            <textarea value={message} onChange={e => {setMessage(e.target.value); validate({name: name, email: email, message: e.target.value })}}/>
            <button onClick={handleSubmit}>Send Query</button>
        </form>
    </div>
    )
}