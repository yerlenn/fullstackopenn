import { useState } from "react"

const NewPerson = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>add a new</h2>
            <div>name: <input value={newName} onChange={handleNameChange}/></div>
            <div>number: <input  value={newNumber} onChange={handleNumberChange}/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewPerson