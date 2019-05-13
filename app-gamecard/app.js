/* importar as configurações do servidor */
var app = require('./config/server');
require('dotenv').config();
//var PORT = process.env.PORT || 5000; /* para MacOSX

var PORT = process.env.PORT || 443; /* para MacOSX
//var PORT = process.env.PORT || 5000; /* para MacOSX

var PORT = process.env.PORT || 80;  /* para Windows 
var PORT = process.env.PORT || 80;  /* para Windows */

/* parametrizar a porta de escuta */
app.listen(PORT, function(){
	console.log('Servidor online');
}) 
	/* parametrizar a porta de escuta */ 