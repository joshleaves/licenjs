#!/usr/bin/env node

var program = require('commander');
var LiceNjs = require('./../lib/licenjs');

function validYear (y) {
    if (y.match(/^[0-9]{4}$/) !== null) return y;
    return false;
}

program
    .version('0.1.0')
    .usage('[-h] [-o ORGANIZATION] [-p PROJECT] [-t TEMPLATE_PATH] [-y YEAR] [--vars] [license]')
    .option('-o, --org <ORGANIZATION>', 'organization, defaults to .gitconfig or process.env.USER')
    .option('-p, --proj <PROJECT>', 'name of project, defaults to name of current directory')
//    .option('-t, --template <TEMPLATE_PATH>', 'path to license template file')
    .option('-y, --year <YEAR>', 'copyright year', validYear)
    .option('--vars', 'list template variables for specied license')
    .parse(process.argv);

var opts = {
    license     : (program.args.length > 0 ? program.args[0] : null),
    organization: program.org      || null,
    project     : program.proj     || null,
    template    : program.template || null,
    year        : program.year     || null,
    vars        : program.vars     || false
};

lice = new LiceNjs(opts).guessContext().render();

process.exit(0);