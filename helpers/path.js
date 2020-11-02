const path = require('path');


// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);

// The path.dirname() method returns the directory name of a path

/*
Example:
path.dirname('/foo/bar/baz/asdf/quux');
Returns: '/foo/bar/baz/asdf'

*/

// process:

/*
The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require(). It can also be explicitly accessed using require()

*/