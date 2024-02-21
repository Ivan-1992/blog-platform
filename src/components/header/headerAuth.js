import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logOutUser } from '../../redux/slices/user-slice'
import icon from '../../assets/Rectangle 1.png'

import styles from './header.module.scss'

const HeaderAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = sessionStorage.user
  const username = user ? JSON.parse(user) : ''
  const avatar = username.image

  const logOut = () => {
    dispatch(logOutUser())
    navigate('./articles')
  }

  return (
    <div className={styles.header__user_block}>
      <button className={styles.header__user_block__create_button}>
        <Link className={styles.header__user_block__create_button_link}>Create article</Link>
      </button>
      <figure className={styles.header__user_block_figure}>
        <figcaption className={styles.header__user_block_figure__figcaption}>
          <Link to="/profile" className={styles.header__user_block_figure__link}>
            {username.username}
          </Link>
        </figcaption>
        <Link to="/profile">
          <img src={avatar ? avatar : icon} alt="avatar" className={styles.header__user_block_figure__img} />
        </Link>
      </figure>
      <button className={styles.header__user_block__log_out_button} onClick={logOut}>
        <Link className={styles.header__user_block__log_out_button_link}>Log Out</Link>
      </button>
    </div>
  )
}

export default HeaderAuth
