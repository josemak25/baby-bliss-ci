/*
 *`ALL NETWORK API REQUESTS AND INTERCEPTOR BUILDER
 * @method POST - http verb for request
 * @method GET - http verb for get
 * @method DELETE - http verb for delete
 * @method PUT - http verb for update
 * @GET - send a get request to the server
 * @POST - send a post request to the server
 * @DELETE - send a delete request to the server
 * @PUT - send a put request to the server
 */

import ENV_VARIABLES, { ENV_VARIABLES_TYPES } from '../../config';

type POST_TYPES = { path: string; payload: any; authToken: string };

class API {
  private BASE_URL: string;
  // static authToken: string;

  constructor(ENV: ENV_VARIABLES_TYPES) {
    this.BASE_URL = ENV.BABY_BLISS_BASE_URI;
  }

  get(path: string, authToken: string): Promise<any> {
    return fetch(`${this.BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  post(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}${request.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.authToken}`
      },
      body: JSON.stringify(request.payload)
    });
  }

  put(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}${request.path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.authToken}`
      },
      body: request.payload ? JSON.stringify(request.payload) : null
    });
  }

  delete(request: POST_TYPES): Promise<any> {
    return fetch(`${this.BASE_URL}/${request.path}/${request.payload.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.authToken}`
      }
    });
  }
}

export default new API(ENV_VARIABLES);