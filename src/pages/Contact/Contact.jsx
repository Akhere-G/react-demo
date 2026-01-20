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

    function updateFormState(field, value){{
        setFormState(prevState => 
            ({...prevState, [field]: value}))
        }   
    }

    function validate(formState){
        const { name, email, message } = formState
        const errorMessages = {
            name: "",
            email: "",
            message: ""
        }
        if (name.trim().length === 0){
            errorMessages.name = "Name is required"
        } else if (name.trim().length > 30) {
            errorMessages.name = "Name must be less than 30 characters"
        }

        if (email.trim().length === 0){
            errorMessages.email = "Email is required"
        } else if (email.trim().length > 30) {
            errorMessages.email = "Email must be less than 30 characters"
        } else if (!email.includes("@")){
            errorMessages.email = "Email must be in the corrcet format"
        }

         if (message.trim().length === 0){
            errorMessages.message = "Message is required"
        } else if (message.trim().length > 300) {
            errorMessages.message = "Message must be less than 300 characters"
        }

        setErrorMessages(errorMessages)

        return Object.values(errorMessages).some(value => value !== "")
    }
    function handleSubmit(e){
        e.preventDefault()
        const hasErrors = validate(formState)
        if (hasErrors){
            return
        }
        fetch("http://localhost/contact",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState)
        })
        alert("Message successfully sent")
    }

    return (
    <div>
        <p>Contact</p>
        <form className="form">
            <label>Name</label>
            <input 
                value={formState.name} 
                onChange={e => {
                    updateFormState("name", e.target.value);
                    validate({ ...formState, name: e.target.value,  })
                }} 
            />
           {errorMessages.name && <p className="errorMessage">{errorMessages.name}</p>}
            
            <label>Email</label>
            <input 
                type="email" 
                value={formState.email} 
                onChange={e => {
                    updateFormState("email", e.target.value);
                    validate({ ...formState, email: e.target.value })
                    }} />
            {errorMessages.email && <p className="errorMessage">{errorMessages.email}</p>}

            <label>Message</label>
            <input 
                value={formState.message} 
                onChange={e => {
                    updateFormState("message", e.target.value);
                    validate({ ...formState, message: e.target.value })
                }} 
                />
            {errorMessages.message && <p className="errorMessage">{errorMessages.message}</p>}
            
            <button onClick={handleSubmit}>Send Query</button>
        </form>
    </div>
    )
}