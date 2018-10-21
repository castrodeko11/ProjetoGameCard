# ProjetoGameCard
Projeto da Faculdade


1- instalar nodejs no computador, versão node-v10.9.0-x64;

2- instalar MongoDB version: 3.2.9;

3- setar o mongo db na variável de ambiente.

	vá no diretório que o mongo foi instalado => MongoDB => Server => 3.2 => bin 
	 copie o caminho até bin.

	abra 'Editar as variáveis de sistema do ambiente do sistema'=> Variáveis de Ambiente => ;
	clique na variável path e selecione Editar => Novo => e cole o caminho que foi copiado => clique em Ok;

	para testar abra o prompt de comando e digite 'mongo --version', se aparecer a versão, a 
	variável foi setada com sucesso;

4 - abra dois prompts, em um digite mongod e dê Enter. No outro digite mongo e dê enter para iniciar a conexão com o banco de dados.

5 - abra outro prompt e vá até a pasta app_nodejs_padrao, digite 'npm install' e dê enter (fará que os módulos do node sejam instalados). Em seguida, digite
	"npm install nodemon --save", que devera instalar o nodemon.
	após este passo, abra o projeto, e dentro da pasta 'gameCard' deve aparecer a nova pasta 'node_modules'.

6-no mesmo prompt usado anteriormente, digite 'nodemon app' para iniciar o servidor local.

	deverá aparecer a mensagem de 'Servidor online'

7 - Agora o projeto pode ser rodado normalmente.

8 - para sair do servidor aperte CTRL+C e depois S.




	

	
