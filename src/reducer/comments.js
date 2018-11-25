import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, SUCCESS, FAIL } from '../constants'
import { arrToMap } from './utils'
import { Record, OrderedMap } from 'immutable'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = Record({
  entities: new OrderedMap({})
})

export default (state = new ReducerRecord(), action) => {
  const { type, payload, randomId } = action

  switch (type) {
    case ADD_COMMENT:
      return state.setIn(
        ['entities', randomId],
        new CommentRecord({ ...payload, id: randomId })
      )

    case LOAD_ARTICLE_COMMENTS + SUCCESS: {
      console.log('response from api:', action.payload.response)
      return state.mergeIn(
        ['entities'],
        arrToMap(payload.response, CommentRecord)
      )
    }
    case LOAD_ARTICLE_COMMENTS + FAIL: {
      console.log('||', action.error)
      return state
    }

    default:
      return state
  }
}
