module.exports = function(application){
	application.get('/registro', function(req, res){
		application.app.controllers.registro.consultar(application, req, res);
	});
}