/* importar as configurações do servidor */
var app = require('./config/server');

//var PORT = process.env.PORT || 5000; /* para MacOSX

var PORT = process.env.PORT || 80;  /* para Windows */

	/* parametrizar a porta de escuta */
	app.listen(80, () => {
		console.log("Servidor online na porta padrão: "+80)
	}).on('error', (err) => {
		if((err.errno === 'EADDRINUSE') || (err.errno === 'EACCES')){
			app.listen(5000, () => {
				console.log("Servidor online na porta: "+5000);
		});
	}
});
