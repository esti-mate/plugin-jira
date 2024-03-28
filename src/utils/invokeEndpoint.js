import { config } from "../config";
import { fetch } from "@forge/api";

/**
@param {string} url - The URL of the API endpoint.

@param {"POST"|"GET"} method - The HTTP method to be used for the request.

@param {object} body - The request body.

@returns {Promise}
 */
export const invokeApi = async (url, method, body) => {
    // const headers = new Headers();
    // headers.append("Accept", "*/*");
    // headers.append("Content-Type", "application/json");
  
    const requestOptions = {
      method,
      headers:{ "Accept":"*/*","Content-Type":"application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    console.log("[INVOKE API]:Calling :",config.ESTIMATE_API_URL + url, requestOptions)
    const res = await fetch(config.ESTIMATE_API_URL + url, requestOptions);

    const test = await res.text();
    console.log("[INVOKE API]:Response:" ,test)

    return res.json();
  };