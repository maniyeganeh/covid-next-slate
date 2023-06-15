import React from 'react'

const LabelComponent = props => {
  return (
    <label htmlFor={props.htmlFor}>{props.label}</label>
  )
}

export default LabelComponent
