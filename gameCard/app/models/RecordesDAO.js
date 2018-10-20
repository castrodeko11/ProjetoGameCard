// DAO - Data Access Object

var ObjectId = require('mongodb').ObjectId;

function RecordesDAO(connection){
	//console.log('Entrou na função de conexão do jogo');
	this._connection = connection();
}

RecordesDAO.prototype.getDados = function(usuario, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection('usuarios', function(err, collection){
            collection.find({usuario:usuario}).toArray(function(err, result){
                if(err){
                    console.log(err);
                }else{
                    if((result[0].hasOwnProperty('resultados'))){
                        var user = result[0].resultados;
                        console.log(user);
                        
                        res.render('recorde',{resultados: result[0].resultados, nome: result[0].nome});
                    }else{
                        result[0].resultados=[];
                        console.log("Add resultados\n"+result[0]);
                        res.render('recorde',{resultados: result[0].resultados, nome: result[0].nome});
                    }
                   

                }
            })
            mongoclient.close();
        })
    })
}


module.exports = function(){

	return RecordesDAO;
}