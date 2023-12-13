import { backendlookup } from "../lookup"


export function apiTweetCreate(newTweet, callback) { 
    backendlookup("POST", "/tweets/create/", callback, { content: newTweet })
}

export function apiTweetAction(tweetId, action, callback) {
    const data = { id: tweetId, action: action }
    backendlookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetDetail(tweetId, callback) {
    backendlookup("GET", `/tweets/${tweetId}/`, callback)
}
  
export function apiTweetList(username, callback) {
    if (username) {
      backendlookup("GET", `/tweets/?username=${username}`, callback)
    }   else {
        backendlookup("GET", "/tweets/", callback)
        }
}   