CREATE TABLE IF NOT EXISTS `logged_in_member`(
id int(11) NOT NULL auto_increment,
user_id int(11) NOT NULL, 
session_id char(32) binary NOT NULL, 
token char(128) NOT NULL,
PRIMARY KEY (`id`)
) 
