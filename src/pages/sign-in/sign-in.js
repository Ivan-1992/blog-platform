import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { PATHS } from '../../components/app/app'
import { toLoginUser } from '../../services/fetchData'

import styles from './sign-in.module.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginError = useSelector((state) => state.register.error)
  const data = useSelector((state) => state.register.user)

  useEffect(() => {
    if (!loginError && data.length > 0) {
      navigate(PATHS.ARTICLES)
      message.success('Welcome to RealWorld Blog!')
    }
  })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    dispatch(toLoginUser(data))
  }

  return (
    <div className={styles.signIn}>
      <form className={styles.signIn__form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.signIn__form_header}>Sign In</h4>
        <label className={styles.signIn__form_label}>
          Email address
          <input
            placeholder="Email address"
            className={styles.signIn__form_input}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
                message: 'Not valid e-mail address!',
              },
            })}
          />
        </label>
        <div className={styles.signIn__error}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>

        <label className={styles.signIn__form_label}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={styles.signIn__form_input}
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Minimum number of characters - 6' },
              maxLength: { value: 40, message: 'Maximum number of characters - 40' },
            })}
          />
        </label>
        <div className={styles.signIn__error}>
          {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          {loginError ? `Email or password ${loginError['email or password']}` : null}
        </div>

        <button className={styles.signIn__form_button} disabled={!isValid}>
          Login
        </button>
        <div className={styles.signIn__form_footer}>
          Don&apos;t have an account?
          <Link to={PATHS.SIGN_UP} className={styles.signIn__form_footer_link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}

export { SignIn }
