/*
Created: 1/18/2023
Modified: 2/1/2023
Model: MySQL 8.0
Database: MySQL 8.0
*/

-- Create tables section -------------------------------------------------

-- Table usuarios

CREATE TABLE `usuarios`
(
  `id` Bigint ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario` Char(45) NOT NULL,
  `hash` Char(60) NOT NULL,
  `isAdmin` Bool NOT NULL,
  `email` Char(255) NOT NULL,
  PRIMARY KEY (`id`)
)
;

ALTER TABLE `usuarios` ADD UNIQUE `usuario` (`usuario`)
;

ALTER TABLE `usuarios` ADD UNIQUE `email` (`email`)
;

-- Table grupos

CREATE TABLE `grupos`
(
  `id_grupo` Bigint ZEROFILL UNSIGNED NOT NULL AUTO_INCREMENT,
  `edadInicio` Int UNSIGNED NOT NULL,
  `edadFinal` Int UNSIGNED NOT NULL,
  `nombre` Char(25) NOT NULL,
  `color` Char(7),
  PRIMARY KEY (`id_grupo`)
)
;

-- Table maestros

CREATE TABLE `maestros`
(
  `id_maestro` Bigint NOT NULL,
  `nombre` Char(20) NOT NULL,
  `apellido` Char(20),
  `telefono` Char(15)
)
;

ALTER TABLE `maestros` ADD PRIMARY KEY (`id_maestro`)
;

-- Table tarjetas

CREATE TABLE `tarjetas`
(
  `id_grupo` Bigint ZEROFILL UNSIGNED NOT NULL,
  `id_maestro` Bigint NOT NULL,
  `codigo` Char(10) NOT NULL
)
;

ALTER TABLE `tarjetas` ADD PRIMARY KEY (`id_grupo`, `id_maestro`)
;

ALTER TABLE `tarjetas` ADD UNIQUE `codigo` (`codigo`)
;

-- Create foreign keys (relationships) section -------------------------------------------------

ALTER TABLE `tarjetas` ADD CONSTRAINT `forman` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `tarjetas` ADD CONSTRAINT `poseen` FOREIGN KEY (`id_maestro`) REFERENCES `maestros` (`id_maestro`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

