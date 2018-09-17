module.exports.index = function(application, req, res) {
	req.session.destroy(function(erro){
		res.render('index', {validacao: {}, result: {}, dadosForm: {}});
		console.log("Matou a sessão.")

	});


}

module.exports.autenticar = function(application, req, res) {
	req.session.autorizado = false;
	
	var dadosForm = req.body;

	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazia').notEmpty();

	var erros =  req.validationErrors();

	if(erros){
		res.render('index', {validacao : erros, result: {}, dadosForm:{}});
		return console.log(erros);
	}

	var connection = application.config.dbConnection;

	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);
	//Só podemos ter um response para cada request
}

