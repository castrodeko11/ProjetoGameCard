module.exports.cadastro = function(application, req, res) {
	res.render('cadastro', {validacao:{}, dadosForm: {}});
}


module.exports.cadastrar = function(application, req, res) {
	var dadosForm = req.body; // recebe dados de input do usuario atraves do body-parser, em formato JSON

	req.assert('nome','Nome não pode estar vazio').notEmpty();
	req.assert('usuario','Usuário não pode estar vazio').notEmpty();
	req.assert('senha','Senha não pode estar vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao : erros, dadosForm: dadosForm});
		console.log('Não Podemos cadastrar');
		return console.log(erros);
	}

	var connection = application.config.dbConnection;
	console.log(connection);

	var usuariosDAO = new application.app.models.UsuariosDAO(connection);
	
	//var jogoDAO = new application.app.models.JogoDAO(connection);
	console.log('Variável');
	

	usuariosDAO.inserirUsuario(dadosForm);
	
	//geração dos parametros
	//jogoDAO.gerarParametros(dadosForm.usuario, req, res);


	res.render('index',{validacao: {}, result: {}, dadosForm: {}});
					
}