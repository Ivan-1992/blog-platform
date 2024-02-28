import React from 'react'
import { Link } from 'react-router-dom'

import { PATHS } from '../app/app'

import styles from './header.module.scss'

const HeaderNoAuth = () => {
  return (
    <div className={styles.header__sign_group}>
      <Link to={PATHS.SIGN_IN} className={styles.header__sign_group_in}>
        Sign In
      </Link>
      <button className={styles.header__sign_group_button_up}>
        <Link to={PATHS.SIGN_UP} className={styles.header__sign_group_button_up_link}>
          Sign Up
        </Link>
      </button>
    </div>
  )
}

export default HeaderNoAuth
