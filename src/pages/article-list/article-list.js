import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'

import ArticlePreview from '../../components/article-preview'
import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import { fetchData } from '../../services/fetchData'

import styles from './article-list.module.scss'

const ArticleList = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles[0])
  const isError = useSelector((state) => state.articles.error)

  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const totalPageCount = Math.floor((articlesCount / 50) * 100)
  const isLoading = useSelector((state) => state.articles.loading)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const onPageSelected = (id) => {
    const newOffset = (id - 1) * 5
    dispatch(fetchData(newOffset))
  }
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

  return (
    <div className={styles.article_list}>
      {articles && articles.articles && articles.articles.length > 0 && (
        <ul>
          {articles.articles.map((article) => (
            <li className={styles.article_list__little} key={article.slug}>
              <ArticlePreview article={article} />
            </li>
          ))}
        </ul>
      )}
      <div className={styles.article_list__pagination}>
        <Pagination defaultCurrent={1} total={totalPageCount} size="small" onChange={onPageSelected} />
      </div>
    </div>
  )
}

export default ArticleList
