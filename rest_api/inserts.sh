

mysql -u django --password=django -e "insert into api_event values(2);" fool
mysql -u django --password=django -e "insert into api_event values(3);" fool
mysql -u django --password=django -e "insert into api_event values(4);" fool


mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (0,'Canto');" fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (1,'Cartão Amarelo');"  fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (2,'Cartão Vermelho');" fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (3,'Entrou');" fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (4,'Saiu');" fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (5,'Golo');" fool
mysql -u django --password=django -e "INSERT INTO api_kindevent VALUES (6,'Falta');" fool


mysql -u django --password=django -e "insert into api_position values(1,'Guarda-redes');" fool
mysql -u django --password=django -e "insert into api_position values(2,'Defesa');" fool
mysql -u django --password=django -e "insert into api_position values(3,'Médio');" fool
mysql -u django --password=django -e "insert into api_position values(4,'Avançado');" fool


mysql -u django --password=django -e "insert into api_stadium values('lisboa','Estadio da Luz',90000,NULL);" fool
mysql -u django --password=django -e "insert into api_stadium values('lisboa','Estadio de Alvalade',60000,NULL);" fool
mysql -u django --password=django -e "insert into api_stadium values('Braga','Estadio do beça',90000,NULL);" fool

mysql -u django --password=django -e "insert into api_team values('Benfica','1900-10-10',NULL,0);" fool
mysql -u django --password=django -e "insert into api_team values('Sporting','1900-10-10',NULL,1);" fool
mysql -u django --password=django -e "insert into api_team values('Braga','1900-10-10',NULL,2);" fool

mysql -u django --password=django -e "insert into api_player values(0,'Muriel Becker','1900-10-10',NULL,'Becker',0,0);" fool
mysql -u django --password=django -e "insert into api_player values(1,'Ricardo Fernandes','1900-10-10',NULL,'Fernandes',1,1);" fool
mysql -u django --password=django -e "insert into api_player values(2,'Filipe Mendes','1900-10-10',NULL,'Mendes',2,2);" fool
mysql -u django --password=django -e "insert into api_player values(3,'André Moreira','1900-10-10',NULL,'Moreira',3,0);" fool
mysql -u django --password=django -e "insert into api_player values(4,'Adélcio Varela','1900-10-10',NULL,'Varela',0,1);" fool
mysql -u django --password=django -e "insert into api_player values(5,'Gonçalo Tavares','1900-10-10',NULL,'Tavares',1,2);" fool
mysql -u django --password=django -e "insert into api_player values(6,'João Diogo','1900-10-10',NULL,'Diogo',2,0);" fool
mysql -u django --password=django -e "insert into api_player values(7,'Vincent Sasso','1900-10-10',NULL,'Sasso',3,1);" fool
mysql -u django --password=django -e "insert into api_player values(8,'Diogo Viana','1900-10-10',NULL,'Viana',0,2);" fool
mysql -u django --password=django -e "insert into api_player values(9,'Bruno Pereirinha','1900-10-10',NULL,'Pereirinha',1,0);" fool

Falta o game

mysql -u django --password=django -e "insert into api_playerplaygame(0,<game_id>,0);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(1,<game_id>,1);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(2,<game_id>,2);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(3,<game_id>,3);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(4,<game_id>,4);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(5,<game_id>,5);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(6,<game_id>,6);" fool
mysql -u django --password=django -e "insert into api_playerplaygame(7,<game_id>,7);" fool







