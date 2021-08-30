import axios from "axios"

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})


// AUTH ROUTES

export const loginAPI = (email, password) => {
  return axios.post('/auth/login', { email, password })
}

export const registerAPI = (email, password) => {
  return axios.post('/auth/register', { email, password })
}

// USERS ROUTES

export const updateProfileAPI = (userId, data) => {
  return instance.put(`/users/${userId}`, data)
}

export const daleteProfileAPI = (userId) => {
  return instance.delete(`/users/${userId}`)
}

export const getUsersAPI = () => {
  return instance.get(`/users`)
}

export const getUserAPI = (userId) => {
  return instance.get(`/users/${userId}`)
}

export const addToFriends = (userId, friendId) => {
  return instance.put(`/users/${friendId}`, { userId })
}

// POSTS ROUTES

export const createPostAPI = (data) => {
  return instance.put(`/posts/`, data)
}

export const updatePostAPI = (postId, data) => {
  return instance.put(`/posts/${postId}`, data)
}

export const daletePostAPI = (postId) => {
  return instance.delete(`/users/${postId}`)
}

export const getPostsAPI = () => {
  return instance.get(`/posts`)
}

export const getPostAPI = (postId) => {
  return instance.get(`/posts/${postId}`)
}

export const likePostAPI = (postId) => {
  return instance.put(`/posts/like/${postId}`)
}

export const commentPostAPI = (postId, data) => {
  return instance.put(`/posts/comment/${postId}`, data)
}