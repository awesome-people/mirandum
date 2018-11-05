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
 * Created By: Nitish Kumar on 1/11/18 3:13 PM
 */

require('module-alias/register');
const server = require('@core/server');

class App {
    constructor() {
        server.start();
    }
}

module.exports = new App();