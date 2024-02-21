import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { toLoginUser } from '../../services/fetchData'
import ErrorIndicator from '../../components/error-indicator'

import styles from './sign-in.module.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.register.error)
  const data = useSelector((state) => state.register.user)

  useEffect(() => {
    if (!error && data.length > 0) {
      navigate('/articles')
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

  if (error) {
    return <ErrorIndicator error={error} />
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
            placeholder="Password"
            className={styles.signIn__form_input}
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Minimum number of characters - 6' },
              maxLength: { value: 40, message: 'Maximum number of characters - 40' },
            })}
          />
        </label>
        <div className={styles.signIn__error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>

        <button className={styles.signIn__form_button} disabled={!isValid}>
          Login
        </button>
        <div className={styles.signIn__form_footer}>
          Don&apos;t have an account?
          <Link to="/sign-up" className={styles.signIn__form_footer_link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}

export { SignIn }
