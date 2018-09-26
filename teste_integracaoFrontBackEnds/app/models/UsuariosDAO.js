// DAO - Data Access Object000

/* importar módulo do crypto */

var crypto = require('crypto');

function UsuariosDAO(connection){
	//console.log('Entrou na função de conexão');
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(dadosForm, res){
	global.flag = 0;
	console.log('Entrou no metodo de cadastro')
	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("usuarios", function(erro, collection){
			//console.log('Flag= '+flag);
			let query = {}; // fill in your query here
  			let i = 0;
			collection.count(query, function(erro, count){
				collection.find({usuario: {$eq: dadosForm.usuario}}).toArray(function(err, result){
					global.resp = result;
					
					console.log(result);
				});
				collection.find({email: {$eq: dadosForm.email}}).toArray(function(erro, userMail){
					if((resp[0] == undefined) && (userMail[0] == undefined)){
						var senha_criptografada = crypto.createHash("md5").update(dadosForm.senha).digest("hex");
	
						console.log(senha_criptografada);
	
						dadosForm.senha = senha_criptografada;
	
						collection.insert(dadosForm);
	
						res.render('index',{validacao: {}, result: {}, dadosForm: {}});
;
						console.log(dadosForm);
					}
					else if (resp[0] != undefined){
						var userName = {
							msg: "Nome de usuário já é usado. Por favor escolha outro"
						}
						res.render('cadastro', {validacao:{}, dadosForm: {},result:{}, user: userName, mail:{}});

					}else if (userMail[0] != undefined){
						var userMailConf = {
							msg: "Nome de usuário já é usado. Por favor escolha outro"
						}
						res.render('cadastro', {validacao:{}, dadosForm: {},result:{}, user: {}, mail: userMailConf});

					}
					
				});
				if (++i == count) {mongoclient.close();}

			});
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

			collection.find(dadosForm).toArray(function(erro, user){
	
				console.log(user);
				console.log(dadosForm);
				if(user[0] != undefined){

					req.session.autorizado = true;

					req.session.usuario = user[0].usuario;

					var senha = user[0].senha;
					if((req.session.autorizado) && (user[0].senha == dadosForm.senha)){

					//Como é um método post, sempre dar redirect para não reenviar formulário
					res.render('jogo');		
					}	
					console.log('Senha do db:  '+ user[0].senha+' X '+'\n'+'Senha inserida: '+dadosForm.senha);
				}
				else if(user[0] == undefined){
					res.render('index',{validacao: {}, result: {}, dadosForm: dadosForm});

					//console.log('Senha do db:  '+ user[0].senha+' X '+'\n'+'Senha inserida: '+dadosForm.senha);
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