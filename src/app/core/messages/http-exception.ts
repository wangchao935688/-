/**
 * Created by bingq on 2017/5/29.
 */

import {HttpStatusCode} from  '../enums/httpStatusCode';

export class HttpException {
  constructor(public statusCode?: HttpStatusCode, public errorMessage?: string) {

  }
}
