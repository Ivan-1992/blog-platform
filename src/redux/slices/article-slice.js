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
  },
})

export const { fetchOneArticle, fetchOneArticleFail } = articleSlice.actions
export default articleSlice.reducer
