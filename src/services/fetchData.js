import { fetchArticles, fetchArticlesFail } from '../redux/slices/article-list-slice'
import {
  fetchOneArticle,
  fetchOneArticleFail,
  createNewArticle,
  createNewArticleFail,
  deleteArticleFail,
  editArticle,
  editArticleFail,
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
  return async (dispatch) => {
    const params = new URLSearchParams({ limit: '5', offset: offset })
    const articlesResponse = await fetch(`${baseUrl}articles?${params}`)
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
  return async (dispatch) => {
    const articleResponse = await fetch(`${baseUrl}articles/${slug}`)
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
      dispatch(registerUserFail(registerResponse.status))
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
      dispatch(loginUserFail(loginResponse.status))
    } else {
      const loginData = await loginResponse.json()

      if (loginData) {
        dispatch(loginUser(loginData))
      }
    }
  }
}

export const updateUserProfile = (data) => {
  const token = JSON.parse(sessionStorage.user)
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
      dispatch(editProfileFail(updateResponse.status))
    } else {
      const updateData = await updateResponse.json()

      if (updateData) {
        dispatch(editProfile(updateData))
      }
    }
  }
}

export const createArticle = (data) => {
  const token = JSON.parse(sessionStorage.user)
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
  const token = JSON.parse(sessionStorage.user)
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
    // else {
    //   const articleData = await deleteArticleResponse.json()

    //   if (articleData) {
    //     dispatch(createNewArticle(articleData))
    //   }
    // }
  }
}

export const updateArticle = (data, slug) => {
  const token = JSON.parse(sessionStorage.user)
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
