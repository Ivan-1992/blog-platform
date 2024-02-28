import { fetchArticles, fetchArticlesFail } from '../redux/slices/article-list-slice'
import {
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
} from '../redux/slices/article-slice'
import {
  registerUser,
  registerUserFail,
  loginUser,
  loginUserFail,
  editProfile,
  editProfileFail,
} from '../redux/slices/user-slice'
const baseUrl = 'https://blog.kata.academy/api/'

export const fetchData = (offset) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''

  return async (dispatch) => {
    const params = new URLSearchParams({ limit: '5', offset: offset })
    const headers = {}

    if (token && token.token) {
      headers.Authorization = `Token ${token.token}`
    }

    const articlesResponse = await fetch(`${baseUrl}articles?${params}`, {
      method: 'GET',
      headers,
    })

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
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const headers = {}

    if (token && token.token) {
      headers.Authorization = `Token ${token.token}`
    }

    const articleResponse = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'GET',
      headers,
    })

    if (!articleResponse.ok) {
      dispatch(fetchOneArticleFail(articleResponse.status))
      return
    }
    const articleData = await articleResponse.json()

    if (articleData) {
      dispatch(fetchOneArticle(articleData))
    }
  }
}

export const registrationUser = (data) => {
  return async (dispatch) => {
    const registerResponse = await fetch(`${baseUrl}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    })
    if (!registerResponse.ok) {
      const err = await registerResponse.json()
      dispatch(registerUserFail(err.errors))
    } else {
      const registerData = await registerResponse.json()

      if (registerData) {
        dispatch(registerUser(registerData))
      }
    }
  }
}

export const toLoginUser = (data) => {
  return async (dispatch) => {
    const loginResponse = await fetch(`${baseUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    })

    if (!loginResponse.ok) {
      const err = await loginResponse.json()
      dispatch(loginUserFail(err.errors))
    } else {
      const loginData = await loginResponse.json()

      if (loginData) {
        dispatch(loginUser(loginData))
      }
    }
  }
}

export const updateUserProfile = (data) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const updateResponse = await fetch(`${baseUrl}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token.token}`,
      },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          image: data.avatarImage,
        },
      }),
    })
    if (!updateResponse.ok) {
      const err = await updateResponse.json()
      dispatch(editProfileFail(err.errors))
    } else {
      const updateData = await updateResponse.json()

      if (updateData) {
        dispatch(editProfile(updateData))
      }
    }
  }
}

export const createArticle = (data) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const createArticleResponse = await fetch(`${baseUrl}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token.token}`,
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tags,
        },
      }),
    })

    if (!createArticleResponse.ok) {
      dispatch(createNewArticleFail(createArticleResponse.status))
    } else {
      const articleData = await createArticleResponse.json()

      if (articleData) {
        dispatch(createNewArticle(articleData))
      }
    }
  }
}

export const deleteArticle = (slug) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const deleteArticleResponse = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token.token}`,
      },
    })

    if (!deleteArticleResponse.ok) {
      dispatch(deleteArticleFail(deleteArticleResponse.status))
    }
  }
}

export const updateArticle = (data, slug) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const updateArticleResponse = await fetch(`${baseUrl}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token.token}`,
      },
      body: JSON.stringify({
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tags,
        },
      }),
    })

    if (!updateArticleResponse.ok) {
      dispatch(editArticleFail(updateArticleResponse.status))
    } else {
      const articleData = await updateArticleResponse.json()

      if (articleData) {
        dispatch(editArticle(articleData))
      }
    }
  }
}

export const toFavoriteArticle = (slug) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const toFavoriteResponse = await fetch(`${baseUrl}articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token.token}`,
      },
    })

    if (!toFavoriteResponse.ok) {
      dispatch(estimateArticleFail(toFavoriteResponse.status))
    } else {
      const favoriteData = await toFavoriteResponse.json()

      if (favoriteData) {
        dispatch(estimateArticle(favoriteData))
      }
    }
  }
}

export const unfavoriteArticle = (slug) => {
  const token = localStorage.user ? JSON.parse(localStorage.user) : ''
  return async (dispatch) => {
    const unfavoriteResponse = await fetch(`${baseUrl}articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token.token}`,
      },
    })

    if (!unfavoriteResponse.ok) {
      dispatch(cancelFavoriteArticleFail(unfavoriteResponse.status))
    } else {
      const unfavoriteData = await unfavoriteResponse.json()

      if (unfavoriteData) {
        dispatch(cancelFavoriteArticle(unfavoriteData))
      }
    }
  }
}
