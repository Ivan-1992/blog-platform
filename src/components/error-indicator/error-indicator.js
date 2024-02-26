import React from 'react'
import { Alert } from 'antd'

import styles from './error-indicator.module.scss'

const ErrorIndicator = (err) => {
  const text = `Error! Code: ${err.error}`

  const onReload = () => {
    window.location.reload()
  }

  return (
    <div className={styles.error_indicator}>
      <Alert message={text} type="error" />
      <button className={styles.error_indicator__reload_button} onClick={onReload}>
        Reload page
      </button>
    </div>
  )
}

export default ErrorIndicator
