/*
 * This file is part of the elegans/janaf package.
 *
 * Copyright (c) 2018, Nitish Kumar <mintu.nitish@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/elegans/janaf
 * 
 * Created By: Nitish Kumar on 11/3/2018 6:06 PM
 */

const fs = require('fs');
const path = require('path');
const viewDirPath = path.join(__dirname + '/../../client_resources/views/');
const layoutDirPath = viewDirPath + '/layouts/';

class View {
    constructor(view, data = {}) {
        this.viewName = typeof view === "string" && view.length > 0 ? view + '.elegans.html' : false;
        this.data = typeof data === "object" && data != null ? data : {};
    }

    _validateViewName() {
        if (this.viewName) {
            return fs.existsSync(viewDirPath + this.viewName);
        }
        return false;
    }

    renderTemplate(callback) {
        if (this._validateViewName()) {
            fs.readFile(viewDirPath + this.viewName, 'utf-8', (err, str) => {
                if (!err && str && str.length > 0) {
                    const viewContent = this._interpolateData(str);
                    if (!viewContent) {
                        callback(500);
                    }
                    else {
                        callback(200, viewContent);
                    }
                }
                else {
                    console.log('\x1b[31m%s\x1b[0m', err);
                    callback(500, err);
                }
            });
        }
        else {
            callback(404);
        }
    }

    _interpolateData(viewContent) {
        // handle layouts, sections
        // handle template helpers

        // handle view based passed data
        for(let key in this.data) {
            if(this.data.hasOwnProperty(key) && typeof(this.data[key]) !== "undefined") {
                let replace = this.data[key];
                let find = `@{${key}}`;
                viewContent = viewContent.replace(find, replace);
            }
        }

        return viewContent;
    }
}

module.exports = View;