'use strict';
var expect = require('chai').expect;
var parse = require('../src/index');

describe('#Json-parse', function() {
    it('should parse and modify the json', function() {
        var result = parse('./index.json');
        expect(result["changed"]).to.equal(true);
    });
});