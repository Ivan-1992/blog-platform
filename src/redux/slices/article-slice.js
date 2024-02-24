import { createSlice } from '@reduxjs/toolkit'

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: [],
    loading: true,
    error: null,
  },
  reducers: {
    fetchOneArticle(state, action) {
      state.loading = false
      state.article.pop({
        article: action.payload.article,
      })
      state.article.push({
        article: action.payload.article,
      })
    },
    fetchOneArticleFail(state, action) {
      state.error = action.payload
    },
    createNewArticle(state, action) {
      state.loading = false
      state.article.pop({
        article: action.payload.article,
      })
      state.article.push({
        article: action.payload.article,
      })
    },
    createNewArticleFail(state, action) {
      state.error = action.payload
    },
    deleteArticleFail(state, action) {
      state.error = action.payload
    },
    editArticle(state, action) {
      state.article.pop({
        article: action.payload.article,
      })
      state.article.push({
        article: action.payload.article,
      })
    },
    editArticleFail(state, action) {
      state.error = action.payload
    },
    estimateArticle(state, action) {
      state.article.pop({
        article: action.payload.article,
      })
      state.article.push({
        article: action.payload.article,
      })
    },
    estimateArticleFail(state, action) {
      state.error = action.payload
    },
    cancelFavoriteArticle(state, action) {
      state.article.pop({
        article: action.payload.article,
      })
      state.article.push({
        article: action.payload.article,
      })
    },
    cancelFavoriteArticleFail(state, action) {
      state.error = action.payload
    },
  },
})

export const {
  fetchOneArticle,
  fetchOneArticleFail,
  createNewArticle,
  createNewArticleFail,
  deleteArticleFail,
  editArticle,
  editArticleFail,
  estimateArticle,
  estimateArticleFail,
  cancelFavoriteArticle,
  cancelFavoriteArticleFail,
} = articleSlice.actions
export default articleSlice.reducer
