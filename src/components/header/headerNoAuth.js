import React from 'react'
import { Link } from 'react-router-dom'

import styles from './header.module.scss'

const HeaderNoAuth = () => {
  return (
    <div className={styles.header__sign_group}>
      <Link to="/sign-in" className={styles.header__sign_group_in}>
        Sign In
      </Link>
      <button className={styles.header__sign_group_button_up}>
        <Link to="/sign-up" className={styles.header__sign_group_button_up_link}>
          Sign Up
        </Link>
      </button>
    </div>
  )
}

export default HeaderNoAuth
