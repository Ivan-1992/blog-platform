import { fetchArticles, fetchArticlesFail } from '../redux/slices/article-list-slice'
import { fetchOneArticle, fetchOneArticleFail } from '../redux/slices/article-slice'
const baseUrl = 'https://blog.kata.academy/api/'

export const fetchData = (offset) => {
  return async (dispatch) => {
    const params = new URLSearchParams({ limit: '5', offset: offset })
    const articlesResponse = await fetch(`${baseUrl}articles?${params}`)
    if (!articlesResponse.ok) {
      dispatch(fetchArticlesFail(articlesResponse.status))
    }
    const articlesData = await articlesResponse.json()

    if (articlesData) {
      dispatch(fetchArticles(articlesData))
    }
  }
}

export const fetchArticle = (slug) => {
  return async (dispatch) => {
    const articleResponse = await fetch(`${baseUrl}articles/${slug}`)
    if (!articleResponse.ok) {
      dispatch(fetchOneArticleFail(articleResponse.status))
    }
    const articleData = await articleResponse.json()

    if (articleData) {
      dispatch(fetchOneArticle(articleData))
    }
  }
}
