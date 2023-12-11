import { backendlookup } from "../lookup"


export function apiTweetCreate(newTweet, callback) { 
    backendlookup("POST", "/tweets/create/", callback, { content: newTweet })
}
  
export function apiTweetList(callback) {
    backendlookup("GET", "/tweets/", callback)
}
  