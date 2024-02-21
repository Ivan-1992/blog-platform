import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
// import { Routes, Route, Link } from 'react-router-dom'

import './article-list.scss'
// import Article from '../article'
import ArticlePreview from '../../components/article-preview'
import Spinner from '../../components/spinner'
import ErrorIndicator from '../../components/error-indicator'
import { fetchData } from '../../services/fetchData'

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
      <div className="spinner">
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
    <div className="article-list">
      {articles && articles.articles && articles.articles.length > 0 && (
        <ul>
          {articles.articles.map((article) => (
            <li className="article-list__little" key={article.slug}>
              <ArticlePreview article={article} />
            </li>
          ))}
        </ul>
      )}
      <div className="article-list__pagination">
        <Pagination defaultCurrent={1} total={totalPageCount} size="small" onChange={onPageSelected} />
      </div>
    </div>
  )
}

export default ArticleList
