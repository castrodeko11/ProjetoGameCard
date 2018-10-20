module.exports = function(application) {
	application.put('/jogo', function(req, res){
		application.app.controllers.jogo.jogo(application, req, res);
		console.log(req.body.tempo);
	});

	application.get('/jogo', function(req, res){
		console.log("Entrou na função de renderização do jogo");
		if(req.session.autorizado != true){
			res.send('Usuário precisa fazer login');
			return;
		}else{
			res.render('jogo');
		}

		console.log(req.session.autorizado);

		var msg = '';
		if(req.query.msg != ''){
			msg = req.query.msg;
		}

			console.log(req.body.tempo);
		});

	application.get('/sair', function(req, res){
		application.app.controllers.jogo.sair(application, req, res);
	});
}