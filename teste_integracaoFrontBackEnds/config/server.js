/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-session */

var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-session */
app.use(expressSession({
	secret : 'kjabslhjb', //segredo usado para assinar o coockie de sessão
	resave : false, //se true, faz a sessão ser regravada no servidor mesmo sem modificação no request
	saveUnintialized : false //se true, faz uma nova sessão ser criada sempre que a mesma for modificada
}));

//app.use(multiparty());

app.use(function(req, res, next){

	//res.setHeader("Access Control Allow-Origin", "http://localhost:80"); // para setar Access Control apenas para domínio específico
	res.setHeader("Access-Control-Allow-Origin", "*"); // para setar Access Control para qualquer aplicação de qualquer domínio
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
	res.setHeader("Access-Control-Allow-Headers", "content-type"); 
	res.setHeader("Access-Control-Allow-Credentials", true); 


	next();
});

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app *///executa funções e módulos automaticamente
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;