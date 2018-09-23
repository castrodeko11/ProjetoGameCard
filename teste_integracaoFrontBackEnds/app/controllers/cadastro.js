module.exports.cadastro = function(application, req, res) {
	res.render('cadastro', {validacao:{}, dadosForm: {},result:{}});
}


module.exports.cadastrar = function(application, req, res) {
	var dadosForm = req.body; // recebe dados de input do usuario atraves do body-parser, em formato JSON

	req.assert('nome','Nome não pode estar vazio').notEmpty();
	req.assert('usuario','Usuário não pode estar vazio').notEmpty();
	req.assert('email','E-mail não pode estar vazio').notEmpty();
	req.assert('senha','Senha não pode estar vazio').notEmpty();
	req.assert('emailConfirm', 'E-mail Confirmação não pode estar vazio').notEmpty();
	req.assert('senhaConfirm', 'Senha Confirmação não pode estar vazio').notEmpty();

	var erros = req.validationErrors();

	var result = {
		emailConfirm: dadosForm.emailConfirm,
		senhaConfirm : dadosForm.senhaConfirm
	}

	if((erros) || (dadosForm.senha !== result.senhaConfirm) || (dadosForm.email !== result.emailConfirm)){
		res.render('cadastro', {validacao : erros, dadosForm: dadosForm, result: result});
		console.log('Não Podemos cadastrar');
		console.log(result);
		console.log(dadosForm);
		return console.log(erros);
	}

	delete dadosForm.emailConfirm;
	delete dadosForm.senhaConfirm;
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