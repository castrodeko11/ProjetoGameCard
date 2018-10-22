module.exports.consultar = function(application, req, res) {

	if(req.session.autorizado != true){
        res.send('Usuário precisa fazer login');
        return;
    }else{

		console.log(req.session.autorizado);

		var msg = '';
		if(req.query.msg != ''){
			msg = req.query.msg;
		}
		var connection = application.config.dbConnection;
		console.log(connection);

		var recordesDAO = new application.app.models.RecordesDAO(connection);
		
		//var jogoDAO = new application.app.models.JogoDAO(connection);
		console.log('Variável');
		var usuario = req.session.usuario;

		var nome = req.session.nome;

		recordesDAO.getDados(usuario, nome, res);
	}
}
