/* importar as configurações do servidor */
var app = require('./config/server');
require('dotenv').config();
//var PORT = process.env.PORT || 5000; /* para MacOSX

const port = process.env.PORT || 3000;

const _port = process.env._Port || port;/* para Windows */

	/* parametrizar a porta de escuta */
	app.listen(port, () => {
		console.log("Servidor online na porta padrão: "+port)
	}).on('error', (err) => {
		console.log(err.errno.toString());
		if(err.errno.toString() === 'EADDRINUSE' || err.errno.toString() === 'EACCES'){
			app.listen(_port, () => {
				console.log("Servidor online na porta: "+_port);
		}).on('error', (erro) =>{
			console.log(erro.errno.toString());
			if(erro.message.toString().includes('EADDRINUSE')){
				app.listen(8080, () => {
					console.log("Servidor online na porta: "+8080);
				})
			}
		});
	}
});

