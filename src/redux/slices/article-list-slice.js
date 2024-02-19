import { createSlice } from '@reduxjs/toolkit'

const articleListSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: true,
    error: null,
    articlesCount: 0,
  },
  reducers: {
    fetchArticles(state, action) {
      state.loading = false
      state.articlesCount = action.payload.articlesCount
      state.articles.pop({
        articles: action.payload.articles,
      })
      state.articles.push({
        articles: action.payload.articles,
      })
    },
    fetchArticlesFail(state, action) {
      state.error = action.payload
    },
  },
})

export const { fetchArticles, fetchArticlesFail } = articleListSlice.actions
export default articleListSlice.reducer
