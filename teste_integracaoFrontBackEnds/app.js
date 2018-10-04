/* importar as configurações do servidor */
var app = require('./config/server');
require('dotenv').config();
//var PORT = process.env.PORT || 5000; /* para MacOSX

const port = process.env.PORT || 5000;

const _port = process.env._Port || 1080/* para Windows */

	/* parametrizar a porta de escuta */
	app.listen(port, () => {
		console.log("Servidor online na porta padrão: "+port)
	}).on('error', (err) => {
		if((err.errno === 'EADDRINUSE') || (err.errno === 'EACCES')){
			app.listen(_port, () => {
				console.log("Servidor online na porta: "+_port);
		});
	}
});
