import React from 'react'
import { apiTweetAction } from './lookup'



export function ActionButton(props) {
    const { tweet, action, didperformAction } = props;
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    let likesDisplay = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    const handleClick = (event) => {
      event.preventDefault()
      apiTweetAction(tweet.id, action.type, (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didperformAction) {
          didperformAction(response, status)
        }
      })
    }
    const display = action.type === 'like' ? likesDisplay : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
  
  }
  