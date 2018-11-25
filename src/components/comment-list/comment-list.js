import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import Comment from '../comment'
import CommentForm from '../comment-form'
import toggleOpenItem from '../../decorators/toggleOpen'
import { connect } from 'react-redux'
import { loadArticleComments } from '../../ac'
import Loader from '../../components/common/loader'

class CommentList extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    //from toggleOpenItem decorator
    isOpen: PropTypes.bool,
    toggleOpenItem: PropTypes.func
  }

  componentDidUpdate(oldProps) {
    console.log('props from Comment list', this.props)
    const {
      isOpen,
      loadArticleComments,
      article: { id, commentsLoaded, commentsLoading }
    } = this.props
    if (isOpen && !oldProps.isOpen && !commentsLoaded && !commentsLoading) {
      loadArticleComments(id)
    }
  }

  render() {
    const { isOpen, toggleOpenItem } = this.props
    const text = isOpen ? 'hide comments' : 'show comments'

    return (
      <div>
        <button onClick={toggleOpenItem} className="test--comment-list__btn">
          {text}
        </button>
        <CSSTransition
          transitionName="comments"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.getBody()}
        </CSSTransition>
      </div>
    )
  }
  getBody() {
    const {
      article: { comments = [], id, commentsLoading, commentsLoaded },
      isOpen
    } = this.props
    if (!isOpen) return null
    if (commentsLoading) return <Loader />
    if (!commentsLoaded) return null
    return (
      <div className="test--comment-list__body">
        {comments.length ? (
          this.comments
        ) : (
          <h3 className="test--comment-list__empty">No comments yet</h3>
        )}
        <CommentForm articleId={id} />
      </div>
    )
  }
  get comments() {
    return (
      <ul>
        {this.props.article.comments.map((commentId) => (
          <li key={commentId} className="test--comment-list__item">
            <Comment id={commentId} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  null,
  { loadArticleComments }
)(toggleOpenItem(CommentList))
