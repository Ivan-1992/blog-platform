import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'

import { createArticle, updateArticle } from '../../services/fetchData'
import ErrorIndicator from '../../components/error-indicator'

import styles from './create-article.module.scss'

const CreateArticle = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.register.error)
  const data = useSelector((state) => state.article.article[0]?.article)
  const isSlug = useParams()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tags: [{ tag: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data) => {
    const tags = data.tags.map((tag) => tag.tag)
    const newData = { ...data, tags }

    if (!isSlug.slug && !error) {
      dispatch(createArticle(newData))
      message.success('Article created!')
      navigate('/articles')
    } else if (isSlug.slug && !error) {
      dispatch(updateArticle(newData, isSlug.slug))
      message.success('Article changed!')
      navigate('/articles')
    }
  }

  const isParams = isSlug.slug ? (
    <h4 className={styles.create__form_header}>Edit article</h4>
  ) : (
    <h4 className={styles.create__form_header}>Create new article</h4>
  )

  if (error) {
    return <ErrorIndicator error={error} />
  }

  return (
    <div className={styles.create}>
      <form className={styles.create__form} onSubmit={handleSubmit(onSubmit)}>
        {isParams}

        <label className={styles.create__form_label}>
          Title
          <input
            placeholder="Title"
            className={styles.create__form_input}
            defaultValue={data && isSlug.slug ? data.title : ''}
            {...register('title', {
              required: 'This field is required',
            })}
          />
        </label>
        <div className={styles.create__error}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>

        <label className={styles.create__form_label}>
          Short description
          <input
            placeholder="Short description"
            className={styles.create__form_input}
            defaultValue={data && isSlug.slug ? data.description : ''}
            {...register('description', {
              required: 'This field is required',
            })}
          />
        </label>
        <div className={styles.create__error}>
          {errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}
        </div>

        <label className={styles.create__form_label}>
          Text
          <textarea
            placeholder="Text"
            className={styles.create__form_textarea}
            defaultValue={data && isSlug.slug ? data.body : ''}
            {...register('body', {
              required: 'This field is required',
            })}
          />
        </label>
        <div className={styles.create__error}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>

        <span className={styles.create__form_label}>Tags</span>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              placeholder="Tag"
              className={styles.create__form_input__tag}
              {...register(`tags.${index}.tag`)}
              defaultValue={field.tag}
            />
            {index >= 0 && (
              <button className={styles.create__delete_button} onClick={() => remove(index)}>
                Delete
              </button>
            )}
            {index === 0 && (
              <button
                className={styles.create__add_button}
                onClick={(e) => {
                  e.preventDefault()
                  append({ tag: '' })
                }}
              >
                Add Tag
              </button>
            )}
          </div>
        ))}

        <button className={styles.create__form_button} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  )
}

export default CreateArticle
