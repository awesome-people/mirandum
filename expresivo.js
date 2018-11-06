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
 * Created By: Nitish Kumar on 6/11/18 12:53 PM
 */

require('module-alias/register');
const expresivo = require('@core/cli');
const args = process.argv.slice(2);

new expresivo(args);