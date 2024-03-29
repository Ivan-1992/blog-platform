import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, Popconfirm } from 'antd'

import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import heart from '../../assets/heart.svg'
import fullHeart from '../../assets/fullHeart.svg'
import avatar from '../../assets/Rectangle 1.png'
import { deleteArticle, fetchArticle, fetchData, toFavoriteArticle, unfavoriteArticle } from '../../services/fetchData'

import styles from './article.module.scss'

const Article = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSlug = useParams()
  const article = useSelector((state) => state.article.article[0]?.article)
  const isLoading = useSelector((state) => state.article.loading)
  const isError = useSelector((state) => state.article.error)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const fetchArticleData = async () => {
      dispatch(fetchArticle(isSlug.slug))
    }
    fetchArticleData()
  }, [])
  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <ErrorIndicator err={isError} />
  }

  const { author, body, slug, favorited, createdAt, description, favoritesCount, tagList, title } = article
  const { image, username } = author

  const toFormatDate = (date) => {
    return date.split('T')[0].split('-').join(', ').trim()
  }

  const formattedDate = (date) => {
    return format(new Date(toFormatDate(date)), 'MMMM d, yyyy')
  }

  const confirm = () => {
    dispatch(deleteArticle(slug))
    message.success('Deleted!')
    navigate('/articles')
    dispatch(fetchData())
  }
  const cancel = () => {
    message.error('Cancelled')
  }

  const favorites = favorited ? fullHeart : heart

  const onLike = async (e) => {
    e.preventDefault()

    if (localStorage.length > 0 && !favorited) {
      await dispatch(toFavoriteArticle(slug))
      await dispatch(fetchData())
    }

    if (localStorage.length > 0 && favorited) {
      await dispatch(unfavoriteArticle(slug))
      await dispatch(fetchData())
    }
  }

  const session = localStorage.length > 0 ? JSON.parse(localStorage.user) : null

  return (
    <div className={styles.article}>
      <Link to={`/articles/${slug}`} className={styles.article__header}>
        {title}
      </Link>
      <ul className={styles.article__list}>
        {tagList.map((tag) => (
          <li className={styles.article__list_item} key={tag}>
            {tag}
          </li>
        ))}
      </ul>
      <button className={styles.article__like} onClick={onLike}>
        <img src={favorites} alt="" className={styles.article__like_image} /> {favoritesCount}
      </button>
      <div className={styles.article__short_description}>{description}</div>
      <h6 className={styles.article__user_name}>{username}</h6>
      <p className={styles.article__date}>{formattedDate(createdAt)}</p>
      <img
        src={imgError ? avatar : image}
        alt="avatar"
        className={styles.article__avatar}
        onError={() => setImgError(true)}
      />
      <div className={styles.article__body}>
        <Markdown>{body}</Markdown>
      </div>

      {session?.username == username && (
        <div className={styles.danger_btn}>
          <Popconfirm
            title="Delete the article"
            description="Are you sure to delete this article?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      )}
      {session?.username == username && (
        <button className={styles.article__edit}>
          <Link to="edit" className={styles.article__edit_link}>
            Edit
          </Link>
        </button>
      )}
    </div>
  )
}

export default Article
