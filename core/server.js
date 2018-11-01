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
 * Created By: Nitish Kumar on 1/11/18 2:29 PM
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const moduleAlias = require('module-alias/register');
const port = require('@config/app').port;

let server = {};

server._httpsOptions = {
    'key' : process.env.HTTPS_KEY_PATH ? process.env.HTTPS_KEY_PATH : false,
    'cert' : process.env.HTTPS_CERT_PATH ? process.env.HTTPS_CERT_PATH : false
};

server._unifiedServer = (req, res) => {
    console.log('Hi', req);
};

server.start = () => {
    if (server._httpsOptions.key && server._httpsOptions.cert) {
        server._httpsServer = https.createServer(server._httpsOptions, (req, res) => {
            server._unifiedServer();
        });
        server._httpsServer.listen(port, () => {
            console.log(`Listening on port ${port} for HTTPS connections!`);
        });
    }
    else if (process.env.ENFORCE_HTTPS === 'true') {
        throw Error("HTTPS Enforcement: Configurations Missing!");
    }
    else {
        server._httpServer = http.createServer((req, res) => {
            server._unifiedServer();
        });
        server._httpServer.listen(port, () => {
            console.log(`Listening on port ${port} for HTTP connections`);
        });
    }
};

module.exports = server;

