import React, { useState, useEffect } from 'react';
import { apiTweetCreate, apiTweetList } from './lookup'

export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);
    
    
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const newVal = textAreaRef.current.value
      let tempNewTweets = [...newTweets]
      // change this to a server side call

      const handleBackendUpdate = (response, status) => {
        if (status === 201) {
          tempNewTweets.unshift(response)
          setNewTweets(tempNewTweets)
        } else {
          console.log(response)
          alert("An error occured please try again")
        }
      }
      apiTweetCreate(newVal, (response, status) => {
        handleBackendUpdate(response, status)
      })
      textAreaRef.current.value = ''
    }


    return <div className={props.className}>
      <div className='col-12 mb-3'>
        <form onSubmit={handleSubmit}>
          <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

          </textarea>
          <button type='submit' className='btn btn-primary my-3'>Comment</button>
        </form>
      </div>
      <TweetList newTweets={newTweets} />
    </div>
  }



export function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);
    useEffect(() => {
      const final = [...props.newTweets].concat(tweetsInit)
      if (final.length !== tweets.length) {
        setTweets(final)
      }
    }, [props.newTweets, tweets, tweetsInit])
    useEffect(() => {
      if (tweetsDidSet === false) {
        const handleTweetListLookup = (response, status) => {
          if (status === 200) {
            setTweetsInit(response)
            setTweetsDidSet(true)
          } else {
            alert("There was an error")
          }
        }
        apiTweetList(handleTweetListLookup)
      }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet])
    return tweets.map((item, index) => {
      return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`} />
    })
  }
    
export function ActionButton(props) {
    const { tweet, didperformAction } = props;
    const className = props.className || 'btn btn-primary btn-sm';
    const action = props.action ? props.action.type : 'like';
    const display = props.action ? props.action.display : 'Like';
    const likes = tweet.likes ? tweet.likes : 0;
    const [likesNum, setLikesNum] = useState(likes);
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false);
    const actionDisplay = action === 'like' ? `${likesNum} ${display}` : display;
    const handleClick = (event) => {
      event.preventDefault();
      if (action === 'like') {
        if (userLike === true) {
          // perhaps i Unlike it?
          setLikesNum(likesNum - 1);
          setUserLike(false);
        } else {
          setLikesNum(likesNum + 1);
          setUserLike(true);
        }
      }
    }
    return <button className={className} onClick={handleClick}>{actionDisplay}</button>
  }

  
  export function Tweet(props) {
    const { tweet } = props;
    const className = props.className || 'col-10 mx-auto col-md-6';
    return <div className={className}>
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionButton tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionButton tweet={tweet} action={{ type: "unlike", display: "Unlike" }} />
        <ActionButton tweet={tweet} action={{ type: "retweet", display: "Retweet" }} />
    </div>
  
    </div>
  }
  