/*
 * This file is part of the awesome-people/mirandum package.
 *
 * Copyright (c) 2018, Nitish Kumar <mintu.nitish@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/awesome-people/mirandum
 * 
 * Created By: Nitish Kumar on 1/11/18 4:13 PM
 */

require('module-alias/register');
const routes = require('Routes/web');

class Request {
    constructor(path, method, headers, queryStr = undefined, payload = undefined) {
        const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
        this.path = path;
        this.method = allowedMethods.indexOf(method) > -1 ? method.toLowerCase() : false;
        this.queryStr = typeof queryStr !== "undefined" ? queryStr : false;
        this.payload = typeof payload !== "undefined" ? payload : false;
    }

    resolveRoute() {
        if (this.method) {
            if (routes.hasOwnProperty(this.method)) {
                if (routes[this.method].hasOwnProperty(this.path)) {
                    // @TODO : Execute Handler
                }
            }
        }
        return false;
    }
}

module.exports = Request;