import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { PATHS } from '../app/app'
import { logOutUser } from '../../redux/slices/user-slice'
import icon from '../../assets/Rectangle 1.png'

import styles from './header.module.scss'

const HeaderAuth = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)

  const user = localStorage.user
  const username = user ? JSON.parse(user) : ''
  const avatar = username.image

  const logOut = () => {
    dispatch(logOutUser())
  }

  return (
    <div className={styles.header__user_block}>
      <button className={styles.header__user_block__create_button}>
        <Link to={PATHS.NEW_ARTICLE} className={styles.header__user_block__create_button_link}>
          Create article
        </Link>
      </button>
      <figure className={styles.header__user_block_figure}>
        <figcaption className={styles.header__user_block_figure__figcaption}>
          <Link to={PATHS.PROFILE} className={styles.header__user_block_figure__link}>
            {username.username}
          </Link>
        </figcaption>
        <Link to={PATHS.PROFILE}>
          <img
            src={error ? icon : avatar}
            alt="avatar"
            onError={() => setError(true)}
            className={styles.header__user_block_figure__img}
          />
        </Link>
      </figure>
      <button className={styles.header__user_block__log_out_button} onClick={logOut}>
        <Link className={styles.header__user_block__log_out_button_link}>Log Out</Link>
      </button>
    </div>
  )
}

export default HeaderAuth
