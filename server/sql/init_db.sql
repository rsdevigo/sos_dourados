create table usuario (
    id integer AUTO_INCREMENT, 
    nome varchar(60), 
    idade varchar(3), 
    fone char(11), 
    endereco varchar(60), 
    email varchar(60), 
    cpf char(11), 
    cep char(8), 
    numero_casa integer, 
    user_criado_em datetime DEFAULT CURRENT_TIMESTAMP,
    user_modificado_em datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    senha varchar(1024), 
    primary key (id)
);


create table midia(
    id integer AUTO_INCREMENT, 
    tipo_midia integer, 
    tamanho_midia float, 
    nome_arquivo varchar(60),  
    midia_criado_em datetime DEFAULT CURRENT_TIMESTAMP,
    midia_modificado_em datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    primary key(id)
);


create table reclamacao(
    id integer AUTO_INCREMENT, 
    local_lat decimal(10,8), 
    local_long decimal(11,8), 
    endereco varchar(600),
    bairro varchar(600),
    numero varchar(40),
    descricao varchar(600), 
    reclamacao_criado_em timestamp DEFAULT CURRENT_TIMESTAMP,
    reclamação_modificado_em timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    id_midia integer,  
    id_usuario integer, 
    primary key(id), 
    foreign key(id_midia) references midia(id),
    foreign key(id_usuario) references usuario(id)
);


create table estado_reclamacao(
    id integer AUTO_INCREMENT, 
    nome_est_rec varchar (40), 
    descricao varchar(600), 
    pin_cor integer, 
    primary key(id)
);


create table modelo_mensagem(
    id integer AUTO_INCREMENT, 
    desc_mensagem varchar(600), 
    nome_mensagem varchar(60), 
    mensagem_criado_em datetime DEFAULT CURRENT_TIMESTAMP, 
    mensagem_modificado_em datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    primary key(id)
);


create table categoria(
    id integer AUTO_INCREMENT, 
    nome_categoria varchar(30), 
    descricao_categoria varchar(200), 
    primary key(id)
);


create table categoria_reclamacao(
    id_categoria integer, 
    id_reclamacao integer, 
    primary key(id_categoria, id_reclamacao),
    foreign key(id_categoria) references categoria(id),
    foreign key(id_reclamacao) references reclamacao(id)
);


create table reclamacao_estado_reclamacao(
    id_reclamacao integer, 
    id_estado_reclamacao integer, 
    reclamacao_estado_reclamacao_criado_em datetime DEFAULT CURRENT_TIMESTAMP,
    reclamacao_estado_reclamacao_modificado_em datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(id_reclamacao, id_estado_reclamacao), 
    foreign key(id_reclamacao) references reclamacao(id), 
    foreign key(id_estado_reclamacao) references estado_reclamacao(id)
);


create table reclamacao_mensagem(
    id_modelo_mensagem integer, 
    id_reclamacao integer, 
    mensagem_personalizada varchar(60), 
    reclamacao_mensagem_criado_em datetime DEFAULT CURRENT_TIMESTAMP,
    reclamacao_mensagem_modificado_em datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key(id_modelo_mensagem, id_reclamacao), 
    foreign key(id_modelo_mensagem) references modelo_mensagem(id), 
    foreign key(id_reclamacao) references reclamacao(id)
);

INSERT INTO categoria(nome_categoria) VALUES('Iluminação Pública');
INSERT INTO categoria(nome_categoria) VALUES('Dano ao Patrimônio Público');
INSERT INTO categoria(nome_categoria) VALUES('Limpeza Pública');
INSERT INTO categoria(nome_categoria) VALUES('Tapa Buraco');

INSERT INTO estado_reclamacao(nome_est_rec, descricao, pin_cor) VALUES('Não Lida', '', 0);
INSERT INTO estado_reclamacao(nome_est_rec, descricao, pin_cor) VALUES('Lida', '', 1);
INSERT INTO estado_reclamacao(nome_est_rec, descricao, pin_cor) VALUES('Resolvida', '', 2);

INSERT INTO midia(nome_arquivo) VALUES('lampada.jpg');

INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '5193', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(1, 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(1, 2);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 1);


INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '2222', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(2, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 2);


INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '2323', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(3, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 3);

INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '1212', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(4, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 4);

INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '4545', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(5, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 5);


INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '5656', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(6, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 6);

INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '8888', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(7, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 7);

INSERT INTO reclamacao(endereco, numero, descricao, id_usuario) VALUES('Rua Major Capilé', '9595', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mauris felis, dignissim sed convallis eget, tempus sed nibh. Ut sem lectus', 1);

INSERT INTO reclamacao_estado_reclamacao(id_reclamacao, id_estado_reclamacao) VALUES(8, 1);

INSERT INTO categoria_reclamacao(id_categoria, id_reclamacao) VALUES(1, 8);

UPDATE reclamacao SET id_midia = 1;