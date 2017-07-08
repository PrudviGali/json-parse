var beautify = require('js-beautify');
var fs = require('fs');
var options = {
    noColor: true
};

require.extensions['.json'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var pathRegExp = /\$\{(.*?)\}/g;

var parseFile = function(file) {
    var content =  require(file);
    var json;
    var newContent = content;
    var newSearch = newContent.match(pathRegExp);
    var newPathsContainer = [];
    if(newSearch !== null){
        var uniqueArray = newSearch.filter(function(elem, pos) {
            return newSearch.indexOf(elem) === pos;
        });
        for(var jCount =0;jCount<uniqueArray.length;jCount++){
            var newPathValue = '"'+uniqueArray[jCount]+'"';
            var regExpCheck = new RegExp(escapeRegExp(uniqueArray[jCount]),"g");
            newPathsContainer.push(uniqueArray[jCount]);
            newContent = newContent.replace(regExpCheck,newPathValue);
            var doubleQuoteRegEx = new RegExp(escapeRegExp('""$'),"g");
        }
        json = JSON.parse(newContent);
    }
    else{
        json = JSON.parse(newContent);
    }
    json["changed"] = true;
    convertBacktoOriginalState(JSON.stringify(json), file, newPathsContainer);
};

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function writeToFile(file,content){
    fs.writeFile(file, content, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Modified File");
        }
    });

}

function convertBacktoOriginalState(newContent,file,newPathsContainer){
    var identedContent = beautify(newContent, { indent_size: 2 });
    for(var jCount =0;jCount<newPathsContainer.length;jCount++){
        var oldPathValue = '"'+newPathsContainer[jCount]+'"';
        var regExpCheck = new RegExp(escapeRegExp(oldPathValue),"g");
        identedContent = identedContent.replace(regExpCheck,newPathsContainer[jCount]);
    }
    writeToFile(file,identedContent);
}

module.exports = parseFile;
