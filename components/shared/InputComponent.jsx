import React from 'react'

const InputComponent = props => {
  return (
    <input
      type={props.inputType} className='form-control' value={props.value} onChange={props.change}
      disabled={props.hide && true}
      name={props.inputName}
      placeholder={props.place && props.place}
    />

  )
}

export default InputComponent
