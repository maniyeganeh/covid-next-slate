import React from 'react'

const TextAreaComponent = props => {
  return (
    <textarea
      className='form-control' value={props.value} onChange={props.change}
      disabled={props.hide && true}
      placeholder={props.place && props.place}
    />
  )
}

export default TextAreaComponent
