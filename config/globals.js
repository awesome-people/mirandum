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
 * Created By: Nitish Kumar on 6/11/18 1:11 PM
 */

let globals = {};

globals.paths = {
    SYSTEM_CMD : '@core/cli/commands/',
    APP_CMD : '@root/app/Commands'
};

globals.templateLiterals = {
    APP_NAME : process.env.APP_NAME,
    HOME_URL : process.env.APP_PROTOCOL + '://' + process.env.APP_URL + ':' + process.env.APP_PORT + '/'
};

module.exports = globals;