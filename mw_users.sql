--
-- Database: `csashesi_prophet-agyeman-prempeh`
--

CREATE TABLE IF NOT EXISTS `mw_users` (
uid int(11) NOT NULL auto_increment,
email char(128) NOT NULL,
password char(128) NOT NULL,
user_salt varchar(50) NOT NULL,
is_verified tinyint(1) NOT NULL,
is_active tinyint(1) NOT NULL,
is_admin tinyint(1) NOT NULL,
verification_code varchar(65) NOT NULL,
PRIMARY KEY (`uid`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



