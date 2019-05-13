module.exports = function(application){
	application.get('/manual', function(req, res){
        application.app.controllers.manual.manual(application, req, res);
		
	});
}