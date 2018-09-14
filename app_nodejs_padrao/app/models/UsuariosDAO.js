// DAO - Data Access Object

/* importar módulo do crypto */

var crypto = require('crypto');

function UsuariosDAO(connection){
	//console.log('Entrou na função de conexão');
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	console.log(usuario);
	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("usuarios", function(erro, collection){
			
			var senha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");

			console.log(senha_criptografada);

			usuario.senha = senha_criptografada;

			collection.insert(usuario);

			mongoclient.close();
		});
	});

}

UsuariosDAO.prototype.autenticar = function(dadosForm, req, res){
	console.log('Usuário pode logar');

	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("usuarios", function(erro, collection){
			//find retorna cursor, toArray recupera cursor gerado pelo find e retorna dentro de um callback um array para ser usado na aplicação
			
			var senha_criptografada = crypto.createHash("md5").update(dadosForm.senha).digest("hex"); // codifica a senha do input do usuário dentro do JSON, para compara com a senha em MD5 salva no Db. 

			dadosForm.senha = senha_criptografada;

			collection.find({usuario: dadosForm.usuario}).toArray(function(erro, user){
	
				console.log(user[0]);
				if((user[0] != undefined) && (user[0].senha == dadosForm.senha)){

					req.session.autorizado = true;

					req.session.usuario = user[0].usuario;

					var senha = user.senha;

					console.log('Senha do db:  '+ user[0].senha+' X '+'\n'+'Senha inserida: '+dadosForm.senha);
				}
				if(req.session.autorizado){

					//Como é um método post, sempre dar redirect para não reenviar formulário
					res.redirect('jogo');		
				}else{
					res.render('index',{validacao: {}, result: user[0], dadosForm: dadosForm});
					req.session.autorizado = false;

					console.log('Senha do db:  '+ user[0].senha+' X '+'\n'+'Senha inserida: '+dadosForm.senha);
				}
			

			}); 

			//Já que estamos validando igualdade, podemos passar o JSON completo para fazer a validação
			//Segunda opção abaixo;
			//collection.find({usuario:{$eq:dadosForm.usuario}, senha: {$eq:dadosForm.senha}});
			mongoclient.close();
		});
	});

}

module.exports = function(){

	return UsuariosDAO;
}