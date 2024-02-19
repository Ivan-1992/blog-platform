import React from 'react'
import { Link } from 'react-router-dom'

import './header.scss'

const Header = () => {
  return (
    <header className="header">
      <Link to="/articles" className="header__text">
        RealWorld Blog
      </Link>
      <div className="header__sign-group">
        <Link to="/sign-in" className="header__sign-group_in">
          Sign In
        </Link>
        <button className="header__sign-group_button-up">
          <Link to="/sign-up" className="header__sign-group_button-up_link">
            Sign Up
          </Link>
        </button>
      </div>
    </header>
  )
}

export default Header
