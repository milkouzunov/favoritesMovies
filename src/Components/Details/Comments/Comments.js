import styles from './Comments.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCommentRequest, editCommentRequest } from '../../../appRedux/actions/CommentsActions'; 

import 'antd/dist/antd.css';
import { Comment, Form, Button, List, Input } from 'antd';
import Error from '../../Error';
import nextId from "react-id-generator";
const { TextArea } = Input;


const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({error, onChange, onSubmit, submitting, value, isEditComment }) => (
  <>
    <Form.Item >
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Error style={{

    }}>{error}</Error>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        {isEditComment.isDisabled ? 'Edit Comment' : 'Add Comment'}
      </Button>
    </Form.Item>
  </>
);

function Comments ({movieId}) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  let movieComments = useSelector((state) => state.movies.movie.comments);
  console.log(movieComments);
  const currentId = nextId();
  const [comments, setComments] = useState([]);
  const [submitting, setSubmiting] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [ isEditComment, setIsEditComment ] = useState({newCommentsList: [], commentIndex: '', id: '', isDisabled: false});
  
  useEffect(() => {
    if(movieComments) {
      movieComments = movieComments.map(m => {
        m = {
          author: <div className={styles['author-label']}>
                    <p className={styles['author-username']}>{m.username}</p> 
                    <button
                      id={m._id}
                      onClick={handleOnClickEditBtn} 
                      className={`${styles[`edit-btn`]} ${m.username === username ? styles.view : styles.hide}`}
                    >
                      Edit
                    </button> 
                  </div>,
          content: m.comment,
          movieId: m.movieId
        };

        return m;
      });
      setComments(movieComments);
    }
  }, [movieComments]);
  
  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmiting(true);

    setTimeout(() => {
      if(value.length < 10) {
        setSubmiting(false);
        return setError('Comment must be more than 10 Characters!');
      } else { 
        setError('');
      }
      if(isEditComment.isDisabled) {
      const commentIndex = comments.findIndex(c => c.content === isEditComment.oldComment.replaceAll('/', ' '));
      let commentsList = comments.filter(c => c.content !== isEditComment.oldComment.replaceAll('/', ' '));
      commentsList.splice(Number(commentIndex), 0, {
        author: <div className={styles['author-label']}>
                  <p className={styles['author-username']}>{username}</p> 
                  <button 
                    id={isEditComment.id}
                    onClick={handleOnClickEditBtn} 
                    className={`${styles[`edit-btn`]} ${styles.view}`}
                  >
                    Edit
                  </button>
                </div>,
        content: value,
        movieId: movieId
      });

      setComments(commentsList);
      } else {
        setComments(state => [...state, 
          {
            author: <div className={styles['author-label']}>
                      <p className={styles['author-username']}>{username}</p> 
                      <button 
                        id={currentId}
                        onClick={handleOnClickEditBtn} 
                        className={`${styles[`edit-btn`]} ${styles.view}`}
                      >
                        Edit
                      </button>
                    </div>,
            content: value,
            movieId: movieId
          }
        ]);
      }
      if(!isEditComment.isDisabled) {
        dispatch(addCommentRequest({
          username,
          comment: value,
          movieId: movieId
        }))
      } else {
        dispatch(editCommentRequest(isEditComment.id, {
          username,
          comment: value,
          movieId: movieId
        }))
      }

      setSubmiting(false);
      setValue('');
      if(isEditComment.isDisabled) {
        document.getElementById(isEditComment.id).disabled = false;
      }
      setIsEditComment(state => ({...state, newCommentsList: [],  oldComment: '', commentIndex: '', id: '', isDisabled: false}));
    }, 1000);
  };

  const handleOnClickEditBtn = (e) => {
      e.target.disabled = true;
      const editComment = e.target.closest('[class="ant-comment-content"]').getElementsByClassName('ant-comment-content-detail')[0].innerText;
      setValue(editComment);
      setIsEditComment(state => ({...state, oldComment: editComment, id: e.target.id, isDisabled: true}));
  }

  const handleChange = e => {
    setValue(e.target.value);
  };

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment 
          style={{marginBottom: "10em"}}
          content={ username ?
            <Editor
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
              isEditComment={isEditComment}
            /> : null
          }
          
        />
      </>
    );
  
}

export default Comments;