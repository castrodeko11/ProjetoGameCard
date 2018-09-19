/* importar as configurações do servidor */
var app = require('./config/server');

var PORT = process.env.PORT || 3000; /* para MacOSX

var PORT = process.env.PORT || 80;  /* para Windows 

/* parametrizar a porta de escuta */
app.listen(PORT, function(){
	console.log('Servidor online');
})