// importar mongoDB

var mongo = require('mongodb');

var conMongoDB = function(){
	var db = new mongo.Db(
			'jogo_memoria',
			new mongo.Server(
				'localhost', // string com endereço do servidor do DB
				27017, //porta de conexão
				{}
			),
			{}
		);

		return db;

/**/

}

module.exports = function() {
	return conMongoDB;
}