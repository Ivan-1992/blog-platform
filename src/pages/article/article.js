import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { useSelector } from 'react-redux'

import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import heart from '../../assets/heart.svg'

import styles from './article.module.scss'

const Article = () => {
  const article = useSelector((state) => state.article.article[0]?.article)
  const isLoading = useSelector((state) => state.article.loading)
  const isError = useSelector((state) => state.article.error)

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <ErrorIndicator err={isError} />
      </div>
    )
  }

  const { author, body, slug, createdAt, description, favoritesCount, tagList, title } = article
  // favorited, updatedAt
  const { image, username } = author
  // following

  return (
    <>
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
        <button className={styles.article__like}>
          <img src={heart} alt="" className={styles.article__like_image} /> {favoritesCount}
        </button>
        <div className={styles.article__short_description}>{description}</div>
        <h6 className={styles.article__user_name}>{username}</h6>
        <p className={styles.article__date}>{createdAt}</p>
        <img src={image} alt="avatar" className={styles.article__avatar} />
        <div className={styles.article__body}>
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </>
  )
}

export default Article
