
module.exports.jogo = function(application, req , res) {

	res.render('jogo',{validacao:{}});
	if(req.session.autorizado !== true){
		res.send('Usuário precisa fazer login');
		return;
	}

	/*
	var msg = '';
	if(req.query.msg != ''){
		msg = req.query.msg;
	}

	console.log(msg);

	var usuario = req.session.usuario;
	var casa = req.session.casa;
	var connection = application.config.dbConnection;
	var jogoDAO = new application.app.models.JogoDAO(connection);

	jogoDAO.iniciaJogo(res, usuario, casa, msg);*/


}

module.exports.sair = function(application, req , res) {

	req.session.destroy(function(erro){
		res.render('index', {validacao: {}, result: {}, dadosForm:{}});

	});
}