import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from '../layout'
import ArticleList from '../../pages/article-list'
import Article from '../../pages/article'
import SignUp from '../../pages/sign-up'
import { SignIn } from '../../pages/sign-in'
import EditProfile from '../../pages/edit-profile/edit-profile'
import CreateArticle from '../../pages/create-article/create-article'
import NotFoundPage from '../../pages/not-found-page/not-found-page'
import Private from '../../hoc/private'

export const PATHS = {
  HOME: '/',
  ARTICLES: '/articles',
  ARTICLE: 'articles/:slug',
  EDIT_ARTICLE: 'articles/:slug/edit',
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
  PROFILE: 'profile',
  NEW_ARTICLE: 'new-article',
  NOT_FOUND: '*',
}

const App = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path={PATHS.ARTICLES} element={<ArticleList />} />
        <Route path={PATHS.ARTICLE} element={<Article />} />
        <Route
          path={PATHS.EDIT_ARTICLE}
          element={
            <Private>
              <CreateArticle />
            </Private>
          }
        />
        <Route path={PATHS.SIGN_UP} element={<SignUp />} />
        <Route path={PATHS.SIGN_IN} element={<SignIn />} />
        <Route
          path={PATHS.PROFILE}
          element={
            <Private>
              <EditProfile />
            </Private>
          }
        />
        <Route
          path={PATHS.NEW_ARTICLE}
          element={
            <Private>
              <CreateArticle />
            </Private>
          }
        />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
