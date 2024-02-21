import { configureStore } from '@reduxjs/toolkit'

import articleListReducer from './slices/article-list-slice'
import articleReducer from './slices/article-slice'
import registerReducer from './slices/user-slice'

export default configureStore({
  reducer: {
    articles: articleListReducer,
    article: articleReducer,
    register: registerReducer,
  },
})
