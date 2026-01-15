import { useState } from "react"
import "./Contact.css"

export default function Contact(){
    const [formState, setFormState] = useState({
        name: "",
        email: "", 
        message: ""
    })
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
        if (validate(formState)){
            return
        }

        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState)
        })

        setFormState({
        name: "",
        email: "", 
        message: ""
        })
        alert("Success")
    }

    function handleChange(e) {
        const newState = {...formState, [e.target.name] : e.target.value }
        setFormState(newState)
        validate(newState)
    }

    return (
    <div>
        <h1>Contact</h1>
        <form className="form" >
            <label>Name</label>
            <input value={formState.name} name="name" onChange={handleChange} />
            {errorMessages.name && <p className="errorMessage">{errorMessages.name}</p>}
            <label>Email</label>
            <input value={formState.email} name="email" onChange={handleChange} />
            {errorMessages.email && <p className="errorMessage">{errorMessages.email}</p>}
            <label>Message</label>
            <textarea value={formState.message} name="message" onChange={handleChange}/>
            {errorMessages.message && <p className="errorMessage">{errorMessages.message}</p>}
            <button onClick={handleSubmit}>Send Query</button>
        </form>
    </div>
    )
}