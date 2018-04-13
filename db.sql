CREATE DATABASE Quiz CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE subject(
	idsub int PRIMARY KEY AUTO_INCREMENT,
    namesub varchar(100) not null UNIQUE
)
CREATE TABLE question(
	idquestion int PRIMARY KEY AUTO_INCREMENT,
    content text not null,
    level varchar(50),
    idsub int not null,
    idgroup int,
    FOREIGN KEY (idsub) REFERENCES subject(idsub),
    FOREIGN KEY (idgroup) REFERENCES question(idquestion)
)
CREATE TABLE anwser(
	idanwser int PRIMARY KEY AUTO_INCREMENT,
    content text not null,
    result int(1) not null,
    idquestion int not null,
    FOREIGN KEY (idquestion) REFERENCES question(idquestion)
)
CREATE TABLE account(
	idacc int PRIMARY KEY AUTO_INCREMENT,
    username varchar(50),
    password varchar(50),
    level varchar(10)
)
INSERT INTO `subject` VALUES (3,'Angular'),(4,'English'),(1,'IQ'),(2,'Nodejs');

INSERT INTO `question` VALUES (1,'Nhà Thanh có ao bèo 1.000m2, ngày hôm sau số lượng bèo sẽ nở gấp đôi ngày hôm trước, đến ngày thứ 18 thì bèo đã nở được nửa ao. Vậy đến ngày thứ bao nhiêu thì bèo sẽ nở đầy ao?',NULL,1,NULL),(2,'9 – 6 - 1; 27 – 1 - 2; 6 - 3 - ?',NULL,1,NULL),(3,'Số tiếp theo của dãy 19, 28, 37, 46, ... là số nào? ',NULL,1,NULL),(4,'Hãy tính dãy số sau đây: 1 + 2 + 3 + ..... + 99 = ...........',NULL,1,NULL),(5,'Minh 4 tuổi, tuổi anh Minh gấp 3 lần tuổi Minh. Khi anh Minh bao nhiêu tuổi thì tuổi anh Minh chỉ còn gấp đôi tuổi Minh? ',NULL,1,NULL),(6,'John có 10 đôi tất. Nếu anh ta mất 7 chiếc tất riêng lẻ thì số đôi nhiều nhất mà anh ta còn lại là bao nhiêu? ',NULL,1,NULL),(7,'Một đội bóng rổ chơi được 2/3 trận đấu và đã thắng 17 bàn, thua 3 bàn. Trong suốt trận đấu còn lại đội bóng có thể thua nhiều nhất bao nhiêu mà vẫn thắng ít nhất 3/4 toàn trận đấu?',NULL,1,NULL),(8,'Các đồng xu được thả vào một cái hộp với tốc độ 2 fit khối/giờ. Nếu một hộp rỗng có kích thước là dài 4 fit, rộng 4 fit và sâu 3 fit, sẽ mất bao lâu để đôt đầy chiếc hộp đó?',NULL,1,NULL),(9,'Nếu x và y là các số nguyên tố thì các giá trị nào trong các giá trị sau không thể là tổng của x và y?',NULL,1,NULL),(10,'Tiền thuê 1 chỗ đậu xe trong gara là 10 đôla/tuần hoặc 30 đôla/tháng. Một người có thể tiết kiệm được bao nhiêu tiền trong 1 năm nếu thuê theo tháng?',NULL,1,NULL),(11,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-3-0.png',NULL,1,NULL),(12,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-4-0.png',NULL,1,NULL),(13,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-5-0.png',NULL,1,NULL),(14,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-6-0.png',NULL,1,NULL),(15,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-7-0.png',NULL,1,NULL),(16,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-9-0.png',NULL,1,NULL),(17,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-10-0.png',NULL,1,NULL),(18,'https://sv1.uphinhnhanh.com/images/2018/04/11/nhung-cau-do-iq-khien-ban-dien-dau-cau-6.png',NULL,1,NULL),(19,'https://sv1.uphinhnhanh.com/images/2018/04/11/nhung-cau-do-iq-khien-ban-dien-dau-cau-8.png',NULL,1,NULL),(20,'https://sv1.uphinhnhanh.com/images/2018/04/11/nhung-cau-hoi-iq-khien-ban-dien-dau-cau-3.png',NULL,1,NULL),(21,'Ms. Bradshaw informed Mr. Tanner that she would be working for ------- office as an intern over the summer.',NULL,4,NULL),(22,'The marketing director showed the annual profits distributed ------- between the corporate executives and the shareholders to the CEO.',NULL,4,NULL),(23,'Queens Hotel ------- substantial discounts to corporations that often lodge their employees there.',NULL,4,NULL),(24,'Our store is closed this week ------- the security system is enhanced.',NULL,4,NULL),(25,'Market analysts are surprised that Xcell Electric\'s quarterly ------- have been steadily increasing by about 4 percent.',NULL,4,NULL);

INSERT INTO `anwser` VALUES (1,'ngày thứ 1',0,1),(6,'Ngày thứ 19',1,1),(7,'Ngày thứ 36',0,1),(8,'Ngày thứ 42',0,1),(9,'2',0,2),(10,'3',1,2),(11,'4',0,2),(12,'5',0,2),(13,'79',0,3),(14,'55',1,3),(15,'49',0,3),(16,'67',0,3),(17,'4950',1,4),(18,'4500',0,4),(19,'4850',0,4),(20,'4650',0,4),(21,'20',0,5),(22,'18',0,5),(23,'14',0,5),(24,'16',1,5),(25,'6',1,6),(26,'7',0,6),(27,'3',0,6),(28,'5',0,6),(29,'5',0,7),(30,'4',1,7),(31,'3',0,7),(32,'7',0,7),(33,'8',0,8),(34,'16',0,8),(35,'24',1,8),(36,'48',0,8),(37,'9',0,9),(38,'13',0,9),(39,'16',0,9),(40,'23',1,9),(41,'140',0,10),(42,'160',1,10),(43,'240',0,10),(44,'260',0,10),(45,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-3-1.png',0,11),(46,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-3-3.png',0,11),(47,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-3-2.png',0,11),(48,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-3-4-.png',1,11),(49,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-4-4-.png',1,12),(50,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-4-3.png',0,12),(51,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-4-2.png',0,12),(52,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-4-1.png',0,12),(53,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-5-1-.png',1,13),(54,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-5-4.png',0,13),(55,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-5-3.png',0,13),(56,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-5-2.png',0,13),(57,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-6-1-.png',1,14),(58,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-6-2.png',0,14),(59,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-6-3.png',0,14),(60,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-6-4.png',0,14),(61,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-7-1.png',0,15),(62,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-7-2-.png',1,15),(63,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-7-3.png',0,15),(64,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-7-4.png',0,15),(65,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-9-1.png',0,16),(66,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-9-2-.png',1,16),(67,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-9-3.png',0,16),(68,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-9-4.png',0,16),(69,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-10-1.png',0,17),(70,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-10-3-.png',1,17),(71,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-10-4.png',0,17),(72,'https://sv1.uphinhnhanh.com/images/2018/04/11/iq1-10-2.png',0,17),(73,'1',0,18),(74,'2',1,18),(75,'1',1,19),(76,'2',0,19),(77,'3',0,19),(78,'Hình D',1,20),(79,'Hình A',0,20),(80,'Hình B',0,20),(81,'Hình C',0,20);

INSERT INTO account
VALUES('','minhchien96','chien8496','user'),
('','admin','admin','admin')