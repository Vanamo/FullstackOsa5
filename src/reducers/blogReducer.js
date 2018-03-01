import blogService from './../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'CHANGE_BLOG':
    const changedBlog = action.data.changedBlog
    const id = changedBlog.id
    return state.map(b => b.id !== id ? b : changedBlog)
  case 'DELETE_BLOG':
    const id_d = action.data.id
    return state.filter(b => b.id !== id_d)
  }
  return state
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject)
    const newBlog = await blogService.getOne(blog.id)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (changedBlog) => {
  return async (dispatch) => {
    await blogService.update(changedBlog.id, changedBlog)
    dispatch({
      type: 'CHANGE_BLOG',
      data: { changedBlog }
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export default reducer