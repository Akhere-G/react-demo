import { useState } from "react"
import "./Contact.css"

export default function Contact(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        email: "",
        message: ""
    })

    function validate({ name, email, message }){
        let errors = {
            name: "",
            email: "",
            message: ""
        }

        if (name.trim().length < 3){
            errors.name = "Name is too short"
        }
        if (name.length > 30){
            errors.name = "Name is too long"
        } 
        if (email.trim().length < 3){
            errors.email = "email is too short"
        }
        if (email.length > 30){
            errors.email = "email is too long"
        } 
        if (message.trim().length < 3){
            errors.message = "Message is too short"
        }
        if (message.length > 30){
            errors.message = "Message is too long"
        } 
        setErrorMessages(errors) 

        return Object.values(errors).join("") !== ""

    }

    function handleSubmit(e){
        e.preventDefault()
        if (validate({name, email, message})){
            return
        }

        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, message: message })
        })

        setName("")
        setEmail("")
        setMessage("")
        alert("Success")
    }

    return (
    <div>
        <h1>Contact</h1>
        <form className="form" >
            <label>Name</label>
            <input value={name} onChange={e => {setName(e.target.value); validate({name: e.target.value, email, message }) }} />
            {errorMessages.name && <p className="errorMessage">{errorMessages.name}</p>}
            <label>Email</label>
            <input value={email} onChange={e => {setEmail(e.target.value); validate({name, email: e.target.value, message })}} />
            {errorMessages.email && <p className="errorMessage">{errorMessages.email}</p>}
            <label>Message</label>
            <textarea value={message} onChange={e => {setMessage(e.target.value); validate({name, email, message: e.target.value })}}/>
            {errorMessages.message && <p className="errorMessage">{errorMessages.message}</p>}
            <button onClick={handleSubmit}>Send Query</button>
        </form>
    </div>
    )
}