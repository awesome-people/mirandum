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
 * Created By: Nitish Kumar on 8/11/18 2:16 PM
 */

const Migrations = require ('aeon/src/Migrations');
const Schema = require('aeon/src/Schema');

class CreateUsersTable extends Migrations
{
    constructor() {
        super();
    }

    up() {
        this.table.increments('id');
        this.table.string('name');
        this.table.string('email');
        this.table.string('password');
        this.table.timestamps();
        Schema.create('users', this.table.structure, (res) => {
            console.log(this.constructor.name.toString());
        });
    }

    down() {
        Schema.dropIfExists('users');
    }
}