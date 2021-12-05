/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import 'antd/dist/antd.css';
import { Comment, Form, Button, List, Input } from 'antd';

import { addComment } from '../../../services/reviewService';

import Error from '../../Error';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({error, onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item >
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Error style={{

    }}>{error}</Error>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function Comments ({movieComments, movieId}) {
  const username = useSelector((state) => state.auth.user);

  const [comments, setComments] = useState([]);
  const [submitting, setSubmiting] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(movieComments) {
      movieComments = movieComments.map(m => {
        m = {
          author: m.username,
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
      setComments(state => [...state, 
        {
          author: username,
          content: value,
          movieId: movieId
        }
      ]);

      addComment({
        username,
        comment: value,
        movieId: movieId
      })
      .catch(error => { 
        setSubmiting(false);
        return setError(error.toString()); 
      });

      setSubmiting(false);
      setValue('');

    }, 1000);
  };

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
            /> : null
          }
          
        />
      </>
    );
  
}

export default Comments;