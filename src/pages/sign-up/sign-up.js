import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { PATHS } from '../../components/app/app'
import { registrationUser } from '../../services/fetchData'

import styles from './sign-up.module.scss'

const SignUp = () => {
  const dispatch = useDispatch()
  const registerError = useSelector((state) => state.register.error)
  const data = useSelector((state) => state.register.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!registerError && data.length > 0) {
      navigate(PATHS.SIGN_IN)
      message.success('Registration successful!')
    }
  })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onBlur',
  })

  const password = watch('password')

  const onSubmit = (data) => {
    dispatch(registrationUser(data))
  }

  return (
    <div className={styles.signUp}>
      <form className={styles.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.signUp__form_header}>Create new account</h4>

        <label className={styles.signUp__form_label}>
          Username
          <input
            placeholder="UserName"
            className={styles.signUp__form_input}
            {...register('username', {
              required: 'This field is required',
              minLength: { value: 3, message: 'Minimum number of characters - 3' },
              maxLength: { value: 20, message: 'Maximum number of characters - 20' },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        <div className={styles.signUp__error}>
          {errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}
          {registerError?.username && <p>{`Username ${registerError.username}`}</p>}
        </div>

        <label className={styles.signUp__form_label}>
          Email address
          <input
            placeholder="Email address"
            className={styles.signUp__form_input}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
                message: 'Not valid e-mail address!',
              },
            })}
          />
        </label>
        <div className={styles.signUp__error}>
          {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
          {registerError?.email && <p>{`Email ${registerError.email}`}</p>}
        </div>

        <label className={styles.signUp__form_label}>
          Password
          <input
            type="password"
            placeholder="Password"
            className={styles.signUp__form_input}
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Minimum number of characters - 6' },
              maxLength: { value: 40, message: 'Maximum number of characters - 40' },
            })}
          />
        </label>
        <div className={styles.signUp__error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>

        <label className={styles.signUp__form_label}>
          Repeat Password
          <input
            type="password"
            placeholder="Repeat Password"
            className={styles.signUp__form_input}
            {...register('repeatPassword', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Minimum number of characters - 6' },
              maxLength: { value: 40, message: 'Maximum number of characters - 40' },
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
        </label>
        <div className={styles.signUp__error}>
          {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'}</p>}
        </div>

        <label className={styles.signUp__form_checkbox_label}>
          <input
            type="checkbox"
            className={styles.signUp__form_checkbox_checkbox}
            {...register('checkbox', {
              required: 'This checkbox is required',
            })}
          />
          I agree to the processing of my personal information
        </label>
        <div className={styles.signUp__error}>{errors?.checkbox && <p>{errors?.checkbox?.message || 'Error!'}</p>}</div>

        <button className={styles.signUp__form_button} disabled={!isValid}>
          Create
        </button>
        <div className={styles.signUp__form_footer}>
          Already have an account?
          <Link to={PATHS.SIGN_IN} className={styles.signUp__form_footer_link}>
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
