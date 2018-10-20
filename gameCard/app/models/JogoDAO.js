// DAO - Data Access Object

var ObjectId = require('mongodb').ObjectId;

function JogoDAO(connection){
	//console.log('Entrou na função de conexão do jogo');
	this._connection = connection();
}

JogoDAO.prototype.finalizaJogo = function(req,res, usuario, id){
	//console.log(req.body.resultado);
	this._connection.open(function(erro, mongoclient){
		mongoclient.collection('usuarios', function(erro,collection){
			collection.update(
				{_id: ObjectId(id)},
				{$push:  {
							resultados:{
								id_resultado: new ObjectId(),
								resultado: req.body.resultado,
								tempo: req.body.tempo
							}
						}
				},
				{},
				function(erro, records){
					if(erro){
						console.log(erro);
					}else{
						console.log(records);
					}
					mongoclient.close();
				}
			)
		})
	})
}



module.exports = function(){

	return JogoDAO;
}