module.exports.manual = function(application, req, res) {
	if(req.session.autorizado != true){
        res.send('Usuário precisa fazer login');
        return;
    }else{
        res.render('manual');
    }

    console.log(req.session.autorizado);

    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }
}