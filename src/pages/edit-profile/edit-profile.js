import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { updateUserProfile } from '../../services/fetchData'

import styles from './edit-profile.module.scss'

const EditProfile = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  const dispatch = useDispatch()
  const updateError = useSelector((state) => state.register.error)

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data))
    message.success('Profile data has been changed')
  }

  return (
    <div className={styles.edit}>
      <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.edit__form_header}>Edit Profile</h4>
        <label className={styles.edit__form_label}>
          Username
          <input
            placeholder="Username"
            className={styles.edit__form_input}
            {...register('userName', {
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
        <div className={styles.edit__error}>
          {errors?.userName && <p>{errors?.userName?.message || 'Error!'}</p>}
          {updateError?.username && <p>{`Username ${updateError.username}`}</p>}
        </div>

        <label className={styles.edit__form_label}>
          Email address
          <input
            placeholder="Email address"
            className={styles.edit__form_input}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
                message: 'Not valid e-mail address!',
              },
            })}
          />
        </label>
        <div className={styles.edit__error}>
          {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
          {updateError?.email && <p>{`Email ${updateError.email}`}</p>}
        </div>

        <label className={styles.edit__form_label}>
          New Password
          <input
            type="password"
            placeholder="Password"
            className={styles.edit__form_input}
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 6, message: 'Minimum number of characters - 6' },
              maxLength: { value: 40, message: 'Maximum number of characters - 40' },
            })}
          />
        </label>
        <div className={styles.edit__error}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>

        <label className={styles.edit__form_label}>
          Avatar image (url)
          <input
            placeholder="Avatar image"
            className={styles.edit__form_input}
            {...register('avatarImage', {
              pattern: {
                value: /^(https?|ftp):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$/,
                message: 'Not valid URL!',
              },
            })}
          />
        </label>
        <div className={styles.edit__error}>
          {errors?.avatarImage && <p>{errors?.avatarImage?.message || 'Error!'}</p>}
        </div>

        <button className={styles.edit__form_button} disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
