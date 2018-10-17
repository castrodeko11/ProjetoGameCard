module.exports = function(application) {
	application.put('/jogo', function(req, res){
		application.app.controllers.jogo.jogo(application, req, res);
		console.log(req.body.resultado);
	});

	application.get('/sair', function(req, res){
		application.app.controllers.jogo.sair(application, req, res);
	});
}