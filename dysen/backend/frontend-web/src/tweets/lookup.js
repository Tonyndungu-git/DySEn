import { backendlookup } from "../lookup"


export function apiTweetCreate(newTweet, callback) { 
    backendlookup("POST", "/tweets/create/", callback, { content: newTweet })
}

export function apiTweetAction(tweetId, action, callback) {
    const data = { id: tweetId, action: action }
    backendlookup("POST", "/tweets/action/", callback, data)
}
  
export function apiTweetList(callback) {
    backendlookup("GET", "/tweets/", callback)
}
  