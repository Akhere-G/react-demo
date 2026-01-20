import React from 'react'
import "./Notification.css"

export default function Notification({ variant, text }) {
  let className = "notification ";

  if (variant === "error") className += "error"
  else if (variant === "success") className += "success"
  else className += "default"

  return (
      <p className={className}>{text}</p>
  )
}
