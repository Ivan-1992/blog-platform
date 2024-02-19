import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line import/order
import store from './redux/store'

import './index.scss'

import App from './components/app'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
