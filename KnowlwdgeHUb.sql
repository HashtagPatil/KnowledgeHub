CREATE DATABASE  IF NOT EXISTS `knowledge_platform` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `knowledge_platform`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: knowledge_platform
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `summary` text,
  `category` varchar(100) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `author_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author_id`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Mastering React Hooks','React Hooks allow state and lifecycle in functional components.','Complete guide to React Hooks.','Tech','react,javascript,frontend',1,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(2,'TypeScript Best Practices','Use strict mode, avoid any, use generics.','Best practices for TS.','Tech','typescript,javascript',1,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(3,'CSS Grid vs Flexbox','Flexbox = 1D layout, Grid = 2D layout.','When to use Grid vs Flexbox.','Tech','css,frontend',1,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(4,'React State Management','Redux vs Context vs Zustand comparison.','State management comparison.','Tech','react,state-management',1,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(5,'Accessible Web Apps','Use ARIA properly and semantic HTML.','Accessibility best practices.','Tech','accessibility,html',1,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(6,'Spring Boot Annotations','Explanation of core Spring annotations.','Spring annotations guide.','Backend','spring-boot,java',2,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(7,'Spring Security JWT','Implement JWT authentication flow.','JWT implementation guide.','Backend','security,jwt',2,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(8,'Hibernate N+1 Problem','Fix N+1 with JOIN FETCH.','Solve N+1 problem.','Backend','hibernate,jpa',2,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(9,'Spring Microservices','Service discovery with Eureka.','Microservices architecture.','Backend','microservices,java',2,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(10,'REST API Design','Versioning, pagination, error handling.','REST best practices.','Backend','rest-api,spring',2,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(11,'Neural Networks Intro','Perceptron to Deep Learning.','NN basics.','AI','machine-learning',3,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(12,'Deploy ML Models','FastAPI + Docker deployment.','ML deployment guide.','AI','docker,fastapi',3,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(13,'Feature Engineering','Scaling, encoding, feature selection.','Improve ML models.','AI','data-science',3,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(14,'NLP with Transformers','HuggingFace usage.','Transformers guide.','AI','nlp,ai',3,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(15,'Explainable AI','SHAP and LIME explanation tools.','Model interpretability.','AI','ai,explainability',3,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(16,'Docker Production Guide','Security hardening practices.','Secure Docker deployments.','DevOps','docker,security',4,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(17,'Kubernetes Deep Dive','Pods, Deployments, Services.','K8s fundamentals.','DevOps','kubernetes',4,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(18,'CI/CD with GitHub Actions','YAML workflows.','CI/CD automation.','DevOps','github,cicd',4,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(19,'AWS HA Architecture','Multi-AZ and Load Balancing.','High availability on AWS.','Cloud','aws,cloud',4,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(20,'Terraform IaC','Infrastructure as Code basics.','Terraform fundamentals.','DevOps','terraform',4,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(21,'OWASP Top 10','Prevent common vulnerabilities.','Web security guide.','Security','security,web',5,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(22,'PostgreSQL Performance','Indexing and query plans.','DB performance tuning.','Database','postgresql',5,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(23,'Zero Trust Security','Never trust, always verify.','Zero Trust model.','Security','zero-trust',5,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(24,'Redis Caching','Cache strategies and TTL.','Redis optimization.','Database','redis',5,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(25,'SQL Optimization','Write efficient queries.','SQL performance guide.','Database','sql,performance',5,'2026-02-25 14:41:29','2026-02-25 14:41:29'),(26,'hi','<p>Hi from amit.</p>','Hi from amit.','Other','Normal',6,'2026-02-25 09:16:40','2026-02-25 09:16:40'),(27,'Spring Boot Annotation @ComponentScan','<p>It will find objects and inject the objects.</p>','It will find objects and inject the objects.','Backend','Springboot, MVC',7,'2026-02-25 11:23:20','2026-02-25 11:23:20'),(28,'Spring Explained: From Basics to Advanced','<p>Spring Boot is an open-source Java framework used for programming standalone, production-grade Spring-based applications with a bundle of libraries that make project startup and is management easier.</p>','Spring Boot is an open-source Java framework used for programming standalone, production-grade Spring-based applications with a bundle of libraries that make project startup and is management easier.','Tech','java, spring-boot',8,'2026-02-25 11:54:15','2026-02-25 11:54:15'),(29,'Amit Explained: From Basics to Advanced','<p>Amit is good boy ands. And he is very bad.</p>','Amit is good boy ands. And he is very bad.','Frontend','',6,'2026-02-25 12:24:22','2026-02-25 12:24:22');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alice_dev','alice@example.com','$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu','USER','2026-02-25 14:41:29'),(2,'bob_backend','bob@example.com','$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu','USER','2026-02-25 14:41:29'),(3,'carol_ml','carol@example.com','$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu','USER','2026-02-25 14:41:29'),(4,'dave_cloud','dave@example.com','$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu','USER','2026-02-25 14:41:29'),(5,'eve_security','eve@example.com','$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6JxLB/2xQu','USER','2026-02-25 14:41:29'),(6,'Amit','patilamit4181@gmail.com','$2a$10$OMx21k6fCBtq4Joo5uGzjee4dpwymvYTCbbudakv7Vg6TgvpAP/Au','USER','2026-02-25 09:16:08'),(7,'sumit','sumit@gmail.com','$2a$10$mOWMmnFurj.waS4kvLe3oOa/OtTmTEMmqawC96kMwIbPO6zGX9lCa','USER','2026-02-25 11:21:02'),(8,'sumit1','sumit1@gmail.com','$2a$10$hfGN7G57FJtjnoVyAX4XVu2A9fAC/RINdc5gv1VOqObrwCjfDYd5q','USER','2026-02-25 11:51:51'),(9,'sujit','sujit@gmail.com','$2a$10$zTLuO4fE1j50dWTW442Yp.iTA2RPH.rHECnANi9oynJdxCUhlU3Y.','USER','2026-02-25 12:25:11');
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

-- Dump completed on 2026-02-25 23:57:19
