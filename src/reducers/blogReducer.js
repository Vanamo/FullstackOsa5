import blogService from './../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  }
  return state
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('b', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export default reducer