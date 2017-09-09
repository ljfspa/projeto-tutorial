-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.2.8-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para clinicvet
DROP DATABASE IF EXISTS `clinicvet`;
CREATE DATABASE IF NOT EXISTS `clinicvet` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `clinicvet`;

-- Copiando estrutura para tabela clinicvet.agendamento
DROP TABLE IF EXISTS `agendamento`;
CREATE TABLE IF NOT EXISTS `agendamento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_agenda` date DEFAULT NULL,
  `hora_agenda` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.animal
DROP TABLE IF EXISTS `animal`;
CREATE TABLE IF NOT EXISTS `animal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `foto_animal` blob DEFAULT NULL,
  `foto_animal_content_type` varchar(255) DEFAULT NULL,
  `nome_animal` varchar(255) DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `pelagem` varchar(255) DEFAULT NULL,
  `obs_tosa` varchar(255) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `porte` varchar(255) DEFAULT NULL,
  `raca_id` bigint(20) DEFAULT NULL,
  `especie_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `especie_id` (`especie_id`),
  UNIQUE KEY `raca_id` (`raca_id`),
  CONSTRAINT `fk_animal_especie_id` FOREIGN KEY (`especie_id`) REFERENCES `especie` (`id`),
  CONSTRAINT `fk_animal_raca_id` FOREIGN KEY (`raca_id`) REFERENCES `raca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.bairro
DROP TABLE IF EXISTS `bairro`;
CREATE TABLE IF NOT EXISTS `bairro` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bairro` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.cidade
DROP TABLE IF EXISTS `cidade`;
CREATE TABLE IF NOT EXISTS `cidade` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cidade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.cliente
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(255) DEFAULT NULL,
  `profisao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.consulta
DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_consulta` date DEFAULT NULL,
  `hora_consulta` varchar(255) DEFAULT NULL,
  `motivo_consulta` varchar(255) DEFAULT NULL,
  `desc_consulta` varchar(255) DEFAULT NULL,
  `recetuario` varchar(255) DEFAULT NULL,
  `pesagem` bigint(20) DEFAULT NULL,
  `agendamento_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_consulta_agendamento_id` (`agendamento_id`),
  CONSTRAINT `fk_consulta_agendamento_id` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.databasechangelog
DROP TABLE IF EXISTS `databasechangelog`;
CREATE TABLE IF NOT EXISTS `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.databasechangeloglock
DROP TABLE IF EXISTS `databasechangeloglock`;
CREATE TABLE IF NOT EXISTS `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.especie
DROP TABLE IF EXISTS `especie`;
CREATE TABLE IF NOT EXISTS `especie` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `especie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.estado
DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `u_f` varchar(255) DEFAULT NULL,
  `estado_nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.funcionario
DROP TABLE IF EXISTS `funcionario`;
CREATE TABLE IF NOT EXISTS `funcionario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `matricula` int(11) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `pessoa_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pessoa_id` (`pessoa_id`),
  KEY `fk_funcionario_manager_id` (`manager_id`),
  CONSTRAINT `fk_funcionario_manager_id` FOREIGN KEY (`manager_id`) REFERENCES `funcionario` (`id`),
  CONSTRAINT `fk_funcionario_pessoa_id` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.jhi_authority
DROP TABLE IF EXISTS `jhi_authority`;
CREATE TABLE IF NOT EXISTS `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.jhi_persistent_audit_event
DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
CREATE TABLE IF NOT EXISTS `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(50) NOT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_persistent_audit_event` (`principal`,`event_date`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.jhi_persistent_audit_evt_data
DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
CREATE TABLE IF NOT EXISTS `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`name`),
  KEY `idx_persistent_audit_evt_data` (`event_id`),
  CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.jhi_user
DROP TABLE IF EXISTS `jhi_user`;
CREATE TABLE IF NOT EXISTS `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(5) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `idx_user_login` (`login`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `idx_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.jhi_user_authority
DROP TABLE IF EXISTS `jhi_user_authority`;
CREATE TABLE IF NOT EXISTS `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`),
  CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.pessoa
DROP TABLE IF EXISTS `pessoa`;
CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `foto_pessoa` blob DEFAULT NULL,
  `foto_pessoa_content_type` varchar(255) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `r_g` int(11) DEFAULT NULL,
  `cpf_pessoa` varchar(255) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL,
  `bairro_id` bigint(20) DEFAULT NULL,
  `cidade_id` bigint(20) DEFAULT NULL,
  `estado_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pessoa_bairro_id` (`bairro_id`),
  KEY `fk_pessoa_cidade_id` (`cidade_id`),
  KEY `fk_pessoa_estado_id` (`estado_id`),
  CONSTRAINT `fk_pessoa_bairro_id` FOREIGN KEY (`bairro_id`) REFERENCES `bairro` (`id`),
  CONSTRAINT `fk_pessoa_cidade_id` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id`),
  CONSTRAINT `fk_pessoa_estado_id` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.produto
DROP TABLE IF EXISTS `produto`;
CREATE TABLE IF NOT EXISTS `produto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `unidade` int(11) DEFAULT NULL,
  `qt_estoque` bigint(20) DEFAULT NULL,
  `validade` date DEFAULT NULL,
  `preco_compra` bigint(20) DEFAULT NULL,
  `preco_venda` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.raca
DROP TABLE IF EXISTS `raca`;
CREATE TABLE IF NOT EXISTS `raca` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `raca` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.servico
DROP TABLE IF EXISTS `servico`;
CREATE TABLE IF NOT EXISTS `servico` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `servico` varchar(255) DEFAULT NULL,
  `agendamento_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_servico_agendamento_id` (`agendamento_id`),
  CONSTRAINT `fk_servico_agendamento_id` FOREIGN KEY (`agendamento_id`) REFERENCES `agendamento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.tratamento
DROP TABLE IF EXISTS `tratamento`;
CREATE TABLE IF NOT EXISTS `tratamento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `data_aplic_trat` timestamp NULL,
  `consulta_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tratamento_consulta_id` (`consulta_id`),
  CONSTRAINT `fk_tratamento_consulta_id` FOREIGN KEY (`consulta_id`) REFERENCES `consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.vacina
DROP TABLE IF EXISTS `vacina`;
CREATE TABLE IF NOT EXISTS `vacina` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vacina_name` varchar(255) DEFAULT NULL,
  `aplic_vacina` varchar(255) DEFAULT NULL,
  `consulta_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vacina_consulta_id` (`consulta_id`),
  CONSTRAINT `fk_vacina_consulta_id` FOREIGN KEY (`consulta_id`) REFERENCES `consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.vermifugo
DROP TABLE IF EXISTS `vermifugo`;
CREATE TABLE IF NOT EXISTS `vermifugo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vermifugo_name` varchar(255) DEFAULT NULL,
  `aplic_vermifugo` varchar(255) DEFAULT NULL,
  `consulta_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vermifugo_consulta_id` (`consulta_id`),
  CONSTRAINT `fk_vermifugo_consulta_id` FOREIGN KEY (`consulta_id`) REFERENCES `consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
-- Copiando estrutura para tabela clinicvet.veterinario
DROP TABLE IF EXISTS `veterinario`;
CREATE TABLE IF NOT EXISTS `veterinario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome_veterinario` varchar(255) DEFAULT NULL,
  `c_rmv` varchar(255) DEFAULT NULL,
  `especialidade` varchar(255) DEFAULT NULL,
  `pessoa_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pessoa_id` (`pessoa_id`),
  CONSTRAINT `fk_veterinario_pessoa_id` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
