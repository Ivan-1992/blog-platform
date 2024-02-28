import React from 'react'
import { Alert } from 'antd'

import styles from './error-indicator.module.scss'

const ErrorIndicator = (err) => {
  const text = `Error! Code: ${err.error}`

  return (
    <div className={styles.error_indicator}>
      <Alert message={text} type="error" />
    </div>
  )
}

export default ErrorIndicator
