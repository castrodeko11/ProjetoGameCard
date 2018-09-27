/* importar as configurações do servidor */
var app = require('./config/server');

//var PORT = process.env.PORT || 5000; /* para MacOSX

var PORT = process.env.PORT || 80;  /* para Windows */

	/* parametrizar a porta de escuta */
	app.listen(80, function() {
		console.log("Servidor online na porta padrão: "+80)
	}).on('error', function(err) {
		if(err.errno === 'EADDRINUSE'){
			app.listen(5000,function(){
				console.log("Servidor online na porta: "+5000);
		});
	}
});
