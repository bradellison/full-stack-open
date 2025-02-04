import { useState } from 'react'
import InputField from './InputField'

const AddPersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
        <InputField onChange={handleNameChange} value={newName} text_description="name" />
        <InputField onChange={handleNumberChange} value={newNumber} text_description="number" />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddPersonForm