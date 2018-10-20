module.exports.consultar = function(application, req, res) {
	var connection = application.config.dbConnection;
	console.log(connection);

	var recordesDAO = new application.app.models.RecordesDAO(connection);
	
	//var jogoDAO = new application.app.models.JogoDAO(connection);
	console.log('Variável');
	var usuario = req.session.usuario;

	recordesDAO.getDados(usuario, res);
}