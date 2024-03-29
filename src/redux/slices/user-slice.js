import { createSlice } from '@reduxjs/toolkit'

const authorization = localStorage.length > 0
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    error: null,
    isAuth: authorization,
  },
  reducers: {
    registerUser(state, action) {
      state.user.push({
        user: action.payload.user,
      })
      state.error = null
    },
    registerUserFail(state, action) {
      state.error = action.payload
    },
    loginUser(state, action) {
      state.user.push({
        user: action.payload.user,
      })
      state.isAuth = true
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.error = null
    },
    loginUserFail(state, action) {
      state.error = action.payload
    },
    logOutUser(state) {
      state.user = []
      state.isAuth = false
      localStorage.clear()
    },
    editProfile(state, action) {
      state.user.push({
        user: action.payload.user,
      })
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    editProfileFail(state, action) {
      state.error = action.payload
    },
  },
})

export const { registerUser, registerUserFail, loginUser, loginUserFail, logOutUser, editProfile, editProfileFail } =
  userSlice.actions
export default userSlice.reducer
