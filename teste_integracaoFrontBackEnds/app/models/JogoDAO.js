// DAO - Data Access Object

var ObjectID = require('mongodb').ObjectID;

function JogoDAO(connection){
	//console.log('Entrou na função de conexão do jogo');
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("jogo", function(erro, collection){
			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});

			//res.render('index', {validacao:{}});
			mongoclient.close();
		});
	});

}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){

	//console.log('Inicia os parametros do jogo');

	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("jogo", function(erro, collection){

			//find retorna cursor, toArray recupera cursor gerado pelo find e retorna dentro de um callback um array para ser usado na aplicação
			collection.find({usuario:usuario}).toArray(function(erro, result){
					//console.log(result[0]);

					res.render('jogo', {img_casa : casa, jogo : result[0], msg: msg});

				//Já que estamos validando igualdade, podemos passar o JSON completo para fazer a validação
				//Segunda opção abaixo;
				//collection.find({usuario:{$eq:dadosForm.usuario}, senha: {$eq:dadosForm.senha}});
				mongoclient.close();
			});
		});
	});
}

JogoDAO.prototype.acao = function(acao){
	console.log(acao);

	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("acao", function(erro, collection){
			
			var date =  new Date();

			var tempo = null;

			switch(parseInt(acao.acao)){
				case 1: tempo = 1 * 60 * 60000; break;
				case 2: tempo = 2 * 60 * 60000; break;
				case 3: tempo = 5 * 60 * 60000; break;
				case 4: tempo = 5 * 60 * 60000; break;
			}

			acao.acao_termina_em = date.getTime() + tempo;
			collection.insert(acao);

			//res.render('index', {validacao:{}});
			
		});

		mongoclient.collection("jogo", function(erro, collection){
			
			var moedas = null;
			switch(parseInt(acao.acao)){
				case 1: moedas = -2 * acao.quantidade; break;
				case 2: moedas = -3 * acao.quantidade; break;
				case 3: moedas = -1 * acao.quantidade; break;
				case 4: moedas = -1 * acao.quantidade; break;
			}


			collection.update(
				{ usuario: acao.usuario},
				{ $inc: {moeda: moedas}},
				{ multi: false});
		});

		mongoclient.close();
	});
}

JogoDAO.prototype.getAcoes = function(usuario, res){
	console.log('Recuperar ações');

	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("acao", function(erro, collection){

			var date = new Date();
			var momento_atual = date.getTime();

			//find retorna cursor, toArray recupera cursor gerado pelo find e retorna dentro de um callback um array para ser usado na aplicação
			collection.find({usuario:usuario, acao_termina_em: {$gt:momento_atual}}).toArray(function(erro, result){
					//console.log(result[0]);

				res.render('pergaminhos', {acoes: result});

					
				//Já que estamos validando igualdade, podemos passar o JSON completo para fazer a validação
				//Segunda opção abaixo;
				//collection.find({usuario:{$eq:dadosForm.usuario}, senha: {$eq:dadosForm.senha}});
				mongoclient.close();
			});
		});
	});

}

JogoDAO.prototype.revogarAcao = function(_id, res){
	this._connection.open(function(erro, mongoclient){
		mongoclient.collection("acao", function(erro, collection){
			collection.remove(
				{_id: ObjectID(_id)},
				function(erro, result){ //callback
					res.redirect('jogo?msg=D');
				}); 
			mongoclient.close();
		});
	});

}

module.exports = function(){

	return JogoDAO;
}