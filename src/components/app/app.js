import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './app.scss'

import Layout from '../layout'
import ArticleList from '../../pages/article-list'
import Article from '../../pages/article'
import SignUp from '../../pages/sign-up'
import { SignIn } from '../../pages/sign-in'
import EditProfile from '../../pages/edit-profile/edit-profile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
