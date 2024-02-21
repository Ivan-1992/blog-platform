import React from 'react'
import { Alert } from 'antd'

import './error-indicator.scss'

const ErrorIndicator = (err) => {
  const text = `Error! Code: ${err.error}`

  const onReload = () => {
    window.location.reload()
  }

  return (
    <div className="error-indicator">
      <Alert message={text} type="error" />
      <button className="error-indicator__reload-button" onClick={onReload}>
        Reload page
      </button>
    </div>
  )
}

export default ErrorIndicator
