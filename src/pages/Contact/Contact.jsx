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
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false
    })

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
        return errorMessages;
    }

    function handleSubmit(e){
        e.preventDefault()

        setTouched({ name: true, email: true, message: true })
        const errorMessages = validate(formState)
        const hasErrors = Object.values(errorMessages).some(value => value !== "")

        setErrorMessages(errorMessages)

        if (hasErrors){
            return
        }
        fetch("http://localhost/contact",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState)
        })
        setFormState({
            name: "",
            email: "",
            message: ""
        })
        alert("Message successfully sent")
    }

    function handleChange(e) {
        const newFormState = { ...formState, [e.target.name]: e.target.value }
        setFormState(newFormState)
        const errorMessages = validate(newFormState)
        setErrorMessages(errorMessages)
    }

    function handleBlur(e){
        const newTouched = {...touched, [e.target.name]: true }
        setErrorMessages(validate(formState))
        setTouched(newTouched)
    }

    return (
    <div>
        <p>Contact</p>
        <form className="form">
            <label>Name</label>
            <input 
                name="name"
                value={formState.name} 
                onChange={handleChange} 
                onBlur={handleBlur}
            />
           {errorMessages.name && touched.name && <p className="errorMessage">{errorMessages.name}</p>}
            
            <label>Email</label>
            <input 
                name="email"
                type="email" 
                value={formState.email} 
                onChange={handleChange} 
                onBlur={handleBlur}
            />
            {errorMessages.email && touched.email && <p className="errorMessage">{errorMessages.email}</p>}

            <label>Message</label>
            <input
                name="message" 
                value={formState.message} 
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errorMessages.message && touched.message && <p className="errorMessage">{errorMessages.message}</p>}
            
            <button onClick={handleSubmit}>Send Query</button>
        </form>
    </div>
    )
}