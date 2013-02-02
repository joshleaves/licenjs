var fs = require('fs');

var LICENSES = [];
(function () {
    var files = fs.readdirSync(__dirname);
    for (var i = 0; i < files.length; ++i) {
	var match = files[i].match(/^template-([a-z0-9]+).txt$/);
	if (match) {
	    LICENSES.push(match[1]);
	}
    };
})();

var DEFAULT_LICENSE = 'bsd3';

(function () {
    function LiceNjs (opts) {
	if ('undefined' === typeof opts) opts = {};
	this.opts = opts;
	return this;
    }

    LiceNjs.prototype.guessContext = function () {
	return this.guessLicense().guessOrg().guessProject().guessYear();
    };

    LiceNjs.prototype.guessLicense = function () {
	if (this.opts.license && LICENSES.indexOf(this.opts.license) !== -1) return this;
	this.opts.license = DEFAULT_LICENSE;
	return this;
    };

    LiceNjs.prototype.guessOrg = function () {
	if (this.opts.organization) return this;
	this.opts.organization = process.env.USER;
	return this;
    };

    LiceNjs.prototype.guessProject = function () {
	if (this.opts.project) return this;
	var cwd = process.cwd().split('/');
	this.opts.project = cwd[cwd.length - 1];
	return this;
    };

    LiceNjs.prototype.guessYear = function () {
	if (this.opts.year) return this;
	this.opts.year = new Date().getFullYear();
	return this;
    };

    LiceNjs.prototype.render = function () {
	var license = fs.readFileSync(__dirname + '/template-' + this.opts.license + '.txt').toString();
	if (this.opts.vars) return this.generateVariables(license);
	return this.generateLicense(license);
    };

    LiceNjs.prototype.generateVariables = function (license) {
	console.log('The %s license template contains the following variables:', this.opts.license);
	match = license.match(/\{\{ ([a-zA-Z]+) \}\}/g);
	match.map(function (x) {
		console.log('   %s', x.substr(3, x.length - 6));
	    });
	return this;
    };

    LiceNjs.prototype.generateLicense = function (license) {
	var self = this;
	var replacer = function (part) {
	    part = part.substr(3, part.length - 6);
	    return self.opts[part];
	};
	license = license.replace(/\{\{ ([a-zA-Z_-]+) \}\}/g, replacer);
	console.log(license);
	return this;
    };

    module.exports = LiceNjs;
})();