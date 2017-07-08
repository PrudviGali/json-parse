Invalid JSON Parser
=========

# JSON parser for parsing invalid JSON into valid JSON file.
# It will look for special character such as '${......}' combinations and parse it to valid JSON file.
# After parsing the JSON, We can do normal JavaScript operations and convert the file back to it's original format with modified keys.


## Installation

  `npm install @gali/json-parser`
 
## Usage

    var parser = require('@gali/json-parser');

    var json = parser('./file.json');  
    Output should be the parsed JSON file.
    Example input structure is listed in src/index.json
    
## Tests

  `npm test`


