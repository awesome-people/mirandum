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
 * Created By: Nitish Kumar on 6/11/18 12:44 PM
 */

class Expresivo {
    constructor(commandWithArgs) {
        this.rawInput = commandWithArgs;
        this.commandIdentifier();
    }

    commandIdentifier() {
        const command = this.rawInput[0];
    }
}

module.exports = Expresivo;