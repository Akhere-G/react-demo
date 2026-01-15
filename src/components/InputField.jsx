export default function InputField({title, value, name, handleChange, errorMessage}){
    return (
        <>
            <label>{title}</label>
            <input value={value} name={name} onChange={handleChange} />
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </>
    )
}