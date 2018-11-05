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
 * Created By: Nitish Kumar on 1/11/18 12:01 PM
 */

const env = require('dotenv').config();
const moduleAlias = require('module-alias');
const path = require('path');

class AppConfig {
    constructor() {
        this.port = process.env.APP_PORT;
        this.protocol = process.env.APP_PROTOCOL ? process.env.APP_PROTOCOL : 'http';
        this.url = process.env.APP_URL;
        this.mode = process.env.APP_MODE ? process.env.APP_MODE : 'DEV';
        moduleAlias.addAliases(AppConfig.getAliases());
    }

    static getAliases() {
        return {
            'Routes' : path.join(__dirname, '/../routes/'),
            'Controllers' : path.join(__dirname, '/../app/Controllers/'),
            'Views' : path.join(__dirname, '/../client_resources/views')
        };
    }
}

module.exports = new AppConfig();