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
 * Created By: Nitish Kumar on 1/11/18 2:29 PM
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const moduleAlias = require('module-alias/register');
const port = require('@config/app').port;
const Request = require('./http/request');
const View = require('./view');

let server = {};

server._unifiedServer = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = (parsedUrl.pathname).replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();
    const queryStrObj = parsedUrl.query;
    const headers = req.headers;
    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        const RequestObj = new Request(path, method, headers, queryStrObj, buffer);
        const resolvedResult = RequestObj.resolveRoute();
        if (resolvedResult) {
            console.log(resolvedResult instanceof View);
            resolvedResult.renderTemplate((statusCode, data) => {
                data = typeof data !== "undefined" ? data : '';
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(statusCode);
                res.end(data);
            });
        }
        else {
            //@TODO Send Not Found Response
        }
    });
};

server.start = () => {
    if (process.env.HTTPS_KEY_PATH && process.env.HTTPS_CERT_PATH) {
        server._httpsOptions = {
            'key': fs.readFileSync(process.env.HTTPS_KEY_PATH),
            'cert': fs.readFileSync(process.env.HTTPS_CERT_PATH)
        };

        server._httpsServer = https.createServer(server._httpsOptions, (req, res) => {
            server._unifiedServer(req, res);
        });

        server._httpsServer.listen(port, () => {
            console.log('\x1b[35m%s\x1b[0m', `Listening on port ${port} for HTTPS connections!`);
        });
    }
    else if (process.env.ENFORCE_HTTPS === 'true') {
        throw Error("HTTPS Enforcement: Configurations Missing!");
    }
    else {
        server._httpServer = http.createServer((req, res) => {
            server._unifiedServer(req, res);
        });
        server._httpServer.listen(port, () => {
            console.log('\x1b[36m%s\x1b[0m', `Listening on port ${port} for HTTP connections`);
        });
    }
};

module.exports = server;

