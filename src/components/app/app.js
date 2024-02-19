import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './app.scss'

import Layout from '../layout'
import ArticleList from '../article-list/article-list'
import Article from '../article'
import SignUp from '../sign-up'
import { SignIn } from '../sign-in'

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
        </Route>
      </Routes>
    </>
  )
}

export default App
