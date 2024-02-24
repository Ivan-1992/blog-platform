import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { fetchArticle, fetchData, toFavoriteArticle, unfavoriteArticle } from '../../services/fetchData'
import heart from '../../assets/heart.svg'
import fullHeart from '../../assets/fullHeart.svg'

import styles from './article-preview.module.scss'

const ArticlePreview = ({ article }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { author, slug, createdAt, description, favoritesCount, tagList, title, favorited } = article
  const { image, username } = author

  const toFormatDate = (date) => {
    return date.split('T')[0].split('-').join(', ').trim()
  }

  const formattedDate = (date) => {
    return format(new Date(toFormatDate(date)), 'MMMM d, yyyy')
  }

  const onClick = () => {
    dispatch(fetchArticle(slug))
  }

  const favorites = favorited ? fullHeart : heart

  const onLike = async () => {
    if (sessionStorage.length == 0) navigate('/sign-in')
    sessionStorage.length > 0 && !favorited
      ? await dispatch(toFavoriteArticle(slug))
      : await dispatch(unfavoriteArticle(slug))
    await dispatch(fetchData())
  }

  return (
    <div className={styles.article}>
      <Link to={`/articles/${slug}`} onClick={onClick} className={styles.article__header}>
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
      <img src={image} alt="avatar" className={styles.article__avatar} />
    </div>
  )
}

export default ArticlePreview
