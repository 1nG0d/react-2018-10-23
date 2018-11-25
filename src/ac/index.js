import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_DATE_RANGE,
  CHANGE_SELECTION,
  ADD_COMMENT,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  START,
  SUCCESS,
  FAIL,
  LOAD_ALL_COMMENTS,
  LOAD_ARTICLE_COMMENTS
} from '../constants'

export function incrementActionCreator() {
  return { type: INCREMENT }
}

export function deleteArticle(articleId) {
  return {
    type: DELETE_ARTICLE,
    payload: { id: articleId }
  }
}

export function changeDateRange(dateRange) {
  return {
    type: CHANGE_DATE_RANGE,
    payload: { dateRange }
  }
}

export function changeSelection(selected) {
  return {
    type: CHANGE_SELECTION,
    payload: { selected }
  }
}

export function addComment(comment, articleId) {
  return {
    type: ADD_COMMENT,
    payload: { comment, articleId },
    generateId: true
  }
}

export function loadAllArticles() {
  return {
    type: LOAD_ALL_ARTICLES,
    callAPI: '/api/article'
  }
}
export function loadAllComments() {
  return {
    type: LOAD_ALL_COMMENTS,
    callAPI: '/api/comments'
  }
}

// export function loadArticle(id) {
//   return {
//     type: LOAD_ARTICLE,
//     payload: { id },
//     callAPI: `/api/article/${id}`
//   }
// }

export function loadArticleComments(articleId) {
  return function(dispatch) {
    dispatch({ type: LOAD_ARTICLE_COMMENTS + START, payload: { articleId } })

    setTimeout(function() {
      fetch(`/api/comment?article=${articleId}`)
        .then((res) => res.json())
        .then((response) =>
          dispatch({
            type: LOAD_ARTICLE_COMMENTS + SUCCESS,
            payload: { response, articleId }
          })
        )
        .catch((error) =>
          dispatch({
            type: LOAD_ARTICLE_COMMENTS + FAIL,
            payload: { error, articleId }
          })
        )
      console.log('comments for article LOADED')
    }, 1000)
  }
}

export function loadArticle(id) {
  return function(dispatch) {
    dispatch({
      type: LOAD_ARTICLE + START,
      payload: { id }
    })

    fetch(`/api/article/${id}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch({
          payload: response,
          type: LOAD_ARTICLE + SUCCESS
        })
      })
      .catch((e) =>
        dispatch({
          type: LOAD_ARTICLE + FAIL,
          payload: { id },
          error: e
        })
      )
  }
}
