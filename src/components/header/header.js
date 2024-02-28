import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PATHS } from '../app/app'

import HeaderNoAuth from './headerNoAuth'
import HeaderAuth from './headerAuth'
import styles from './header.module.scss'

const Header = () => {
  const auth = useSelector((state) => state.register.isAuth)

  return (
    <header className={styles.header}>
      <Link to={PATHS.ARTICLES} className={styles.header__text}>
        RealWorld Blog
      </Link>
      {auth || localStorage.length > 0 ? <HeaderAuth /> : <HeaderNoAuth />}
    </header>
  )
}

export default Header
