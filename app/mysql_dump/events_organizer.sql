-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: events_organizer
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendees`
--

DROP TABLE IF EXISTS `attendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci KEY_BLOCK_SIZE=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendees`
--

LOCK TABLES `attendees` WRITE;
/*!40000 ALTER TABLE `attendees` DISABLE KEYS */;
INSERT INTO `attendees` VALUES (1,'Mantas','Petraitis','mantaspetraitis@gmail.com','865895266',1),(2,'Agne','Pauraite','agnyte@gmail.com','866125895',1),(3,'Vilte','Valaite','viltute@gmail.com','865558954',2),(4,'Jonas','Jonaitis','jonasj@yahoo.com','862997736',2),(5,'Egle','Smalaite','egsmal@yahoo.com','864932577',1),(6,'Laima','Laimiene','ll@gmail.com','867552399',1),(7,'Laima','Laimutiene','lll@gmail.com','867552399',1),(8,'Jane','Balniene','jb@gmail.com','859442233',1),(9,'Jane','Balniene','jb@gmail.com','859442233',1),(12,'Gabija','Gabyte','gabyte@gmail.com','865589254',15),(16,'Gabija','Gabyte','gabyte@gmail.com','865589254',14),(19,'Ina','Iniene','ina@gmail.com','859774528',14),(23,'Jonas','Jonynas','jonelis@gmail.com','866599855',14),(31,'Irma','Valentaitė','irmaval@gmail.com','855566952',15);
/*!40000 ALTER TABLE `attendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `userSurname` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jolita','Petkeviciute','jolita.petkeviciute@gmail.com','test123'),(2,'Audra','Randiene','audra@gmail.com','test111'),(3,'Irma','Irmaite','irirml@yahoo.com','test999'),(4,'Ona','One','onute@yahoo.com','$2b$12$UfzAI.Oao9wMYKQO0iQtOuzd7O71QgzzknAXLZdAZSsBxBwNzh8ru'),(5,'Audra','Randiene','audra@yahoo.com','$2b$12$KTUB6OoCKwNKivtOucGl6um2b.UjdpjuBz08SPyc1ywIVoUVu/6Yi'),(6,'Indre','Railaite','indre.railaite@yahoo.com','$2b$12$BImRmcYkvvlYkHie0yqLleWPCNzQguvPSxItZ6OFE8A7N4.IDgCcu'),(7,'Jonas','Jonaitis','jonaj@gmail.com','$2b$12$jNMobicwtXaH8iJXnmPXLetUMydGeTNZ9yZUqtYAfPn1vegviGqly'),(8,'Paulius','Jonynas','paulius@gmail.com','$2b$12$KYjypQGndLebQd3rsZ5DmOLZdk4YGluOzWDpSxKfn7vRyJcwiB94i'),(9,'Aldona','Petkeviciene','aldona@gmail.com','$2b$12$9XUvL2hs2hc1BVDnNHHzGemBVi2lFCPtfUWdzyBJF7QUqsG5jiWyy'),(10,'Emile','Post','emi@gmail.com','$2b$12$xJAI0mgJuHiZLT3CoDXaYONjcv2oTEYf2SIr5WXTohB9N/.Ovj7eu'),(11,'Zivile','Karosaite','zivile@gmail.com','$2b$12$.yiPHaXQKi5ZtaOozOTiNesI4q6tq2.6.7Wtlry/BPbCw9Z2K98GK'),(12,'Vanda','Vandiene','vanda@gmail.com','$2b$12$Mgo5uc5a38KlHnaNn3XVW.hoBZ9nu.ggCuEzzl.6qhGtrdrZUWuxC'),(13,'Rima','Strolyte','strolyte@gmail.com','$2b$12$o5QLG8iDqHOI1NTRbHvkn.AoxPi54j/gw3V30X4K1ePjs500IgwhS'),(14,'Domi','Pomi','domipomi@gmail.com','$2b$12$jb0jeb.s85uWYnPjyz28I.DOrSYiPkT.ia1F1NgMrGqakU13zI.gm'),(15,'Emi','Lemi','emilemi@yahoo.com','$2b$12$ps9PDUCulYnVP7y64mD6i./6jKWt4S3LWYyKUKk0FQqzmdZ/uu6IO');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-08 22:15:50
