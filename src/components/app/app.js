import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './app.scss'

import Layout from '../layout'
import ArticleList from '../../pages/article-list'
import Article from '../../pages/article'
import SignUp from '../../pages/sign-up'
import { SignIn } from '../../pages/sign-in'
import EditProfile from '../../pages/edit-profile/edit-profile'
import CreateArticle from '../../pages/create-article/create-article'
import NotFoundPage from '../../pages/not-found-page/not-found-page'
import Private from '../../hoc/private'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="articles/:slug/edit" element={<CreateArticle />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
          <Route
            path="new-article"
            element={
              <Private>
                <CreateArticle />
              </Private>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
