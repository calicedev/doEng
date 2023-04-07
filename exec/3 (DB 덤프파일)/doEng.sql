-- --------------------------------------------------------
-- 호스트:                          j8a601.p.ssafy.io
-- 서버 버전:                        10.11.2-MariaDB-1:10.11.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- doeng 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `doeng` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `doeng`;

-- 테이블 doeng.material 구조 내보내기
CREATE TABLE IF NOT EXISTS `material` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.material:~0 rows (대략적) 내보내기
DELETE FROM `material`;

-- 테이블 doeng.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `member_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.member:~17 rows (대략적) 내보내기
DELETE FROM `member`;
INSERT INTO `member` (`id`, `created_at`, `authority`, `email`, `member_id`, `name`, `nickname`, `password`, `phone`, `provider`, `provider_id`) VALUES
	(13, '2023-03-23 05:04:12.392494', 'ROLE_USER', 'yuhmin92@naver.com', 'honghong', '안녕하세요', 'hongsee', '$2a$10$cyQ0VaEcWQNKryAMQmpPue7N6zfwwo6.plTAovmHII4A5E78kXiIy', '01012341234', NULL, NULL),
	(15, '2023-03-24 15:44:32.935773', 'ROLE_USER', 'admin@gmail.com', 'admin', '어드민', 'admin_nickname', '$2a$10$DarQ9IzuYjPbA4lJVBzPVO86qpygVVgOV/isfGJKm0LAKw1DU/kd2', '010-1111-3344', NULL, NULL),
	(21, '2023-03-27 05:59:13.444192', 'ROLE_USER', 'hgh21233@naver.com', 'django', '한견', '어무해', '$2a$10$h0.AFO8fxkL4eezgBeuvZOsbDGVoLO5fZpNpfvvj9wc7vhQFWn/A.', '010-1234-1234', NULL, NULL),
	(22, '2023-03-29 09:10:59.714297', 'ROLE_USER', 'lion123@lion.com', 'lion', '라이옹', '라이옹', '$2a$10$fTY7XLXRTT.7p0kOSZb.t.6Utvewh/qBRv3UXM1zHahKJE9bm7Nea', '010-0000-0000', NULL, NULL),
	(23, '2023-03-30 05:33:10.071068', 'ROLE_USER', '96.hs.jeong@gmail.com', 'jhs1oo4', '스기스기', '스기스기', '$2a$10$iO9ACtxOWWIw3Re6fatyEOiBaFD0YQI9IUsuuWTRH91DGOPLOm5s2', '01012345678', NULL, NULL),
	(45, '2023-04-01 11:37:07.968782', 'ROLE_USER', 'calicedev@gmail.com', '111961930910698971685', '임혜은', 'heidi', '$2a$10$2NQk740P39cFo6aNA3ygfOUlbDc670cN59qSFROc.3Q8ntKJlQsSu', '01059173344', NULL, NULL),
	(46, '2023-04-01 12:31:25.549758', 'ROLE_USER', 'hgh21233@gmail.com', '112704066313536998741', '한기현', '하이요요', '$2a$10$ZzoEwE5MERGa.2yAVV6GLuSbLUQsTeDo13ohKhe7oHov0I/wBsHqK', '010-9832-9832', NULL, NULL),
	(47, '2023-04-01 12:32:49.005875', 'ROLE_USER', 'dlrjsrnr01@naver.com', 'dlrjsrnr01', '내친구', '레서판다', '$2a$10$h4HSxzJRJCptNEyB3b/fE.wwrB9GhRVBykEldYswBqs9QixWoq9nO', '01096040325', NULL, NULL),
	(48, '2023-04-02 03:38:01.031513', 'ROLE_USER', 'dojsfffff@gmail.com', '100234956726328304488', '이찬희', '차니가공차니', '$2a$10$GMGcmOquZi49bSqaFftAjuJlJF/wcNbHtpexkcfePZ0U0QWCMO70C', '01024809512', NULL, NULL),
	(52, '2023-04-04 00:42:09.269271', 'ROLE_USER', 'arkddkwl2029@naver.com', 'unlike96', '리병호', '병호리', '$2a$10$L2EBay5v.fOs1nFGQzg12e/hSatck9KakLxPkvoERFDc4eoZueJSq', '01055656587', NULL, NULL),
	(53, '2023-04-04 06:20:08.134058', 'ROLE_USER', 'wpgur07@gmail.com', '116967083975812686087', '유제혁', 'wpguremdwkd', '$2a$10$pBSzMIF4C874BeVrLU1EgeUmQdKRd9fuZYB1OCIY/HXMIVyKAMLZW', '01023044212', NULL, NULL),
	(62, '2023-04-04 06:24:28.494983', 'ROLE_USER', 'dlwltn0350@gmail.com', '117676082727372849171', '이지수', 'zz', '$2a$10$PEFWeB2FkqM5v43SfHtomuNyfVA4WqmMte/U5OGIPPJYhDjjRb2cC', 'zz', NULL, NULL),
	(64, '2023-04-04 07:20:34.829935', 'ROLE_USER', 'heiditty@gmail.com', '108819966020721603453', '임혜은', 'sdsdsds', '$2a$10$b9.HhcyulvNDVOI7uoZ0yOTt3lBefkZ/.RxVr8NNtE6WaGciyt3Hu', '01015345343', NULL, NULL),
	(65, '2023-04-04 08:42:42.943034', 'ROLE_USER', 'cladren12332@gmail.com', '118209128927633327259', '김동언', '동도로', '$2a$10$wE8k/vWVC9iLQVqfv.QSku2toRmYC58Mm5cZkiElW38ZpHRHnBWm.', '', NULL, NULL),
	(66, '2023-04-04 11:01:12.668114', 'ROLE_USER', 'leewonyoung2323@gmail.com', '116702070262491345241', '이원영', '유제혁', '$2a$10$E3j0D3MDnjC0uh2Q9NAsoewXncoKdxWjLbMx1ocbTajXlB0np9iJC', '01094544977', NULL, NULL),
	(67, '2023-04-05 07:00:49.912280', 'ROLE_USER', 'wpgur07@naver.com', 'wpgur07', '유제혁', '등장제혁', '$2a$10$eL0hRpb9d69NVRIYlf62XOuYZG8ThuK66bFs3S1onS/.9kjyEX9JO', '01023044212', NULL, NULL),
	(68, '2023-04-06 01:20:40.243102', 'ROLE_USER', 'jjtiger0@gmail.com', '114208253503069786310', '최호근 (컨설턴트)', '최호근', '$2a$10$nj0AeB2bq2aRAFtJDBh2buPyylw6HR38A65XtxW4XVWXE/OY5AQ0K', '01035581504', NULL, NULL);

-- 테이블 doeng.member_has_word 구조 내보내기
CREATE TABLE IF NOT EXISTS `member_has_word` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `tale_id` bigint(20) NOT NULL,
  `word_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKh7qe3n58pevq1eeblh46n4f1s` (`member_id`),
  KEY `FKf0sa28mgk51ty07q93fdijff8` (`tale_id`),
  KEY `FKt4cusqgq3usist7xibyf73wlj` (`word_id`),
  CONSTRAINT `FKf0sa28mgk51ty07q93fdijff8` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`),
  CONSTRAINT `FKh7qe3n58pevq1eeblh46n4f1s` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKt4cusqgq3usist7xibyf73wlj` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.member_has_word:~37 rows (대략적) 내보내기
DELETE FROM `member_has_word`;
INSERT INTO `member_has_word` (`id`, `member_id`, `tale_id`, `word_id`) VALUES
	(1, 15, 1, 1),
	(2, 15, 1, 10),
	(3, 15, 1, 2),
	(4, 15, 1, 4),
	(5, 15, 1, 3),
	(6, 15, 1, 5),
	(7, 15, 1, 6),
	(8, 15, 1, 7),
	(9, 15, 1, 8),
	(10, 15, 1, 9),
	(11, 53, 1, 1),
	(12, 53, 1, 2),
	(13, 53, 1, 10),
	(14, 53, 1, 3),
	(15, 53, 1, 5),
	(16, 67, 1, 1),
	(17, 67, 1, 2),
	(18, 67, 1, 10),
	(19, 67, 1, 3),
	(20, 67, 1, 5),
	(21, 21, 1, 1),
	(22, 21, 1, 2),
	(23, 21, 1, 3),
	(24, 21, 1, 5),
	(25, 66, 1, 1),
	(26, 66, 1, 2),
	(27, 66, 1, 5),
	(28, 66, 1, 3),
	(29, 47, 1, 1),
	(30, 47, 1, 2),
	(31, 47, 1, 10),
	(32, 47, 1, 3),
	(33, 47, 1, 5),
	(34, 45, 1, 1),
	(35, 45, 1, 2),
	(36, 45, 1, 10),
	(37, 45, 1, 3);

-- 테이블 doeng.payment 구조 내보내기
CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL,
  `tale_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4pswry4r5sx6j57cdeulh1hx8` (`member_id`),
  KEY `FKbquxc9j2t4mv30ttcmye1hpbv` (`tale_id`),
  CONSTRAINT `FK4pswry4r5sx6j57cdeulh1hx8` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKbquxc9j2t4mv30ttcmye1hpbv` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.payment:~21 rows (대략적) 내보내기
DELETE FROM `payment`;
INSERT INTO `payment` (`id`, `member_id`, `tale_id`) VALUES
	(4, 21, 1),
	(5, 21, 2),
	(6, 15, 1),
	(7, 47, 1),
	(8, 47, 2),
	(9, 46, 1),
	(10, 45, 1),
	(11, 45, 3),
	(12, 53, 1),
	(13, 66, 1),
	(14, 66, 2),
	(15, 45, 5),
	(16, 66, 6),
	(17, 66, 8),
	(18, 66, 10),
	(19, 45, 9),
	(20, 53, 4),
	(21, 53, 7),
	(22, 53, 11),
	(23, 67, 1),
	(24, 67, 10);

-- 테이블 doeng.picture 구조 내보내기
CREATE TABLE IF NOT EXISTS `picture` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `progress_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK10dbt69simof8jqiqd8s7d17r` (`progress_id`),
  CONSTRAINT `FK10dbt69simof8jqiqd8s7d17r` FOREIGN KEY (`progress_id`) REFERENCES `progress` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.picture:~23 rows (대략적) 내보내기
DELETE FROM `picture`;
INSERT INTO `picture` (`id`, `created_at`, `image`, `progress_id`) VALUES
	(1, '2023-03-24 16:06:45.000000', 'picture/43cd7f90-4c29-415a-aebb-17e21d91e7d3.jpeg', 44),
	(3, '2023-04-05 01:50:44.168503', 'picture/e9471a9c-27ee-4ed0-8c10-9740a5484fc9.jpeg', 33),
	(6, '2023-04-05 05:00:14.055686', 'picture/f9127549-2d94-4601-bba7-3b0a916fc942.jpeg', 4),
	(7, '2023-04-05 05:00:34.834744', 'picture/c5009ee6-77f2-4967-a688-1752586ea7ef.jpeg', 28),
	(9, '2023-04-05 05:06:26.897352', 'picture/d5110df7-55e0-4948-9d4a-6e3ff6b5b33f.jpeg', 33),
	(14, '2023-04-05 07:04:46.377174', 'picture/ccb9f59f-c491-4ed6-842b-6853ffbdd289.jpeg', 93),
	(15, '2023-04-05 07:05:09.849308', 'picture/2ed94322-d2a4-44d0-ac39-88ad1d900227.jpeg', 95),
	(16, '2023-04-05 07:07:48.069260', 'picture/1168ec1a-50fc-448a-be0c-18458f03ced4.jpeg', 100),
	(17, '2023-04-05 07:51:43.556824', 'picture/87b4fb51-8117-42f7-991c-e2cbc45c85cf.jpeg', 28),
	(18, '2023-04-05 07:53:14.672302', 'picture/979c7de5-31a2-4ae2-b64e-5a738075016b.jpeg', 33),
	(19, '2023-04-05 07:54:11.157000', 'picture/ceed7c7f-2e51-4b01-8c39-6d35b0b04c09.jpeg', 28),
	(20, '2023-04-05 08:08:00.054762', 'picture/ba18add6-73f4-4a10-811e-481b72057f7d.jpeg', 28),
	(22, '2023-04-05 08:11:26.411906', 'picture/22ee1ad9-71a2-4cbe-a682-4a75b899224d.jpeg', 28),
	(23, '2023-04-05 08:14:18.712082', 'picture/e3b4ac4a-993a-44c7-9d09-327468091a23.jpeg', 28),
	(26, '2023-04-05 08:52:45.041772', 'picture/d1f59084-191f-41c7-a213-cfce3788c656.jpeg', 107),
	(28, '2023-04-05 08:56:01.929033', 'picture/6711ea35-8c2e-4906-adf0-2d3cea6c274f.jpeg', 83),
	(34, '2023-04-05 08:59:44.693712', 'picture/ffd31625-3761-4e0d-b3e7-9de2483b7a4d.jpeg', 107),
	(36, '2023-04-05 09:00:33.367863', 'picture/9079413a-4611-4a1a-8955-b6ad83c63ef2.jpeg', 107),
	(38, '2023-04-06 00:39:19.969359', 'picture/fab0b7bd-2c6f-45e9-ad34-4853c62dd1c7.jpeg', 83),
	(42, '2023-04-06 01:10:30.481750', 'picture/01498e7c-08ad-423e-85d8-95e6d17cdd02.jpeg', 83),
	(43, '2023-04-06 01:14:17.071141', 'picture/ebf1ecb3-4015-4ee9-b1fe-0ba2927b7f52.jpeg', 83),
	(44, '2023-04-06 04:50:44.272333', 'picture/7bddcdb3-7797-4174-a1be-67bbd6016d06.jpeg', 4),
	(45, '2023-04-06 04:51:31.888506', 'picture/fb0827e2-b974-4494-8b32-115f24fa2b84.jpeg', 33);

-- 테이블 doeng.progress 구조 내보내기
CREATE TABLE IF NOT EXISTS `progress` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `played_at` datetime(6) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `scene_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK67c4004l8jsamu844lgpv95gc` (`member_id`),
  KEY `FK3fponrw2ule7yh6s4u9lgc2my` (`scene_id`),
  CONSTRAINT `FK3fponrw2ule7yh6s4u9lgc2my` FOREIGN KEY (`scene_id`) REFERENCES `scene` (`id`),
  CONSTRAINT `FK67c4004l8jsamu844lgpv95gc` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.progress:~111 rows (대략적) 내보내기
DELETE FROM `progress`;
INSERT INTO `progress` (`id`, `played_at`, `member_id`, `scene_id`) VALUES
	(1, '2023-04-06 04:50:30.568580', 15, 2),
	(2, '2023-04-06 04:50:24.781924', 15, 1),
	(3, '2023-04-06 04:50:31.977682', 15, 3),
	(4, '2023-04-06 04:50:44.274127', 15, 4),
	(5, '2023-04-06 04:54:41.171028', 47, 1),
	(6, '2023-04-06 04:36:01.456779', 47, 2),
	(7, '2023-04-06 04:36:01.859835', 47, 3),
	(8, '2023-04-06 04:36:02.269864', 47, 4),
	(9, '2023-04-06 04:36:02.711737', 47, 5),
	(10, '2023-04-06 04:36:03.111450', 47, 6),
	(11, '2023-04-06 04:36:03.454201', 47, 7),
	(12, '2023-04-06 04:36:03.864917', 47, 8),
	(13, '2023-04-05 07:35:03.538418', 21, 1),
	(14, '2023-04-05 07:35:04.880853', 21, 2),
	(15, '2023-04-05 07:35:05.577648', 21, 3),
	(16, '2023-04-05 07:35:13.527758', 21, 4),
	(17, '2023-04-05 10:56:36.076430', 21, 5),
	(18, '2023-04-05 10:56:43.413509', 21, 6),
	(19, '2023-04-03 23:43:16.261392', 21, 7),
	(20, '2023-04-03 23:43:33.224183', 21, 8),
	(21, '2023-04-03 23:31:10.839234', 21, 9),
	(22, '2023-04-03 23:31:17.422990', 21, 10),
	(23, '2023-04-03 23:31:25.353971', 21, 11),
	(24, '2023-04-03 23:31:29.539463', 21, 12),
	(25, '2023-04-03 23:31:33.211070', 21, 13),
	(26, '2023-04-03 23:31:36.531893', 21, 14),
	(27, '2023-04-06 04:50:47.347034', 15, 5),
	(28, '2023-04-06 04:50:51.314592', 15, 6),
	(29, '2023-04-06 04:51:22.024252', 15, 7),
	(30, '2023-04-06 04:51:22.932826', 15, 8),
	(31, '2023-04-06 04:51:23.900808', 15, 9),
	(32, '2023-04-06 04:51:25.572336', 15, 10),
	(33, '2023-04-06 04:51:31.890089', 15, 11),
	(34, '2023-04-06 04:51:34.501382', 15, 12),
	(35, '2023-04-06 04:51:34.951824', 15, 13),
	(36, '2023-04-06 04:51:35.827514', 15, 14),
	(37, '2023-04-06 04:36:04.422025', 47, 9),
	(38, '2023-04-06 04:36:04.870651', 47, 10),
	(39, '2023-04-06 04:36:06.072550', 47, 11),
	(40, '2023-04-06 04:38:16.865966', 47, 12),
	(41, '2023-04-05 02:52:40.123396', 45, 1),
	(42, '2023-04-05 02:52:41.213246', 45, 2),
	(43, '2023-04-05 15:02:43.091796', 45, 3),
	(44, '2023-04-05 15:02:44.877361', 45, 4),
	(45, '2023-04-05 08:50:54.891955', 45, 5),
	(46, '2023-04-06 04:38:17.989728', 47, 13),
	(47, '2023-04-04 08:20:58.474251', 46, 1),
	(48, '2023-04-04 08:21:00.646892', 46, 2),
	(49, '2023-04-04 08:21:02.161323', 46, 3),
	(50, '2023-04-04 08:21:04.332174', 46, 4),
	(51, '2023-04-04 08:21:30.939895', 46, 5),
	(52, '2023-04-04 08:21:32.909356', 46, 6),
	(53, '2023-04-04 04:23:37.212566', 46, 7),
	(54, '2023-04-04 04:23:38.728112', 46, 8),
	(55, '2023-04-04 04:23:40.458746', 46, 9),
	(56, '2023-04-04 04:23:42.396981', 46, 10),
	(57, '2023-04-04 04:23:43.827530', 46, 11),
	(58, '2023-04-04 04:23:45.113370', 46, 12),
	(59, '2023-04-04 04:23:46.505017', 46, 13),
	(60, '2023-04-05 08:50:38.348728', 45, 6),
	(61, '2023-04-05 08:49:39.759499', 45, 7),
	(62, '2023-04-05 02:52:13.699576', 45, 8),
	(63, '2023-04-05 02:52:14.488209', 45, 9),
	(64, '2023-04-05 00:19:48.317272', 45, 10),
	(65, '2023-04-05 00:19:49.377547', 45, 11),
	(66, '2023-04-05 00:19:50.573880', 45, 12),
	(67, '2023-04-05 00:19:51.949954', 45, 13),
	(68, '2023-04-05 00:19:53.051591', 45, 14),
	(69, '2023-04-05 08:59:05.989747', 53, 1),
	(70, '2023-04-05 08:59:08.072164', 53, 2),
	(71, '2023-04-05 08:59:08.460129', 53, 3),
	(72, '2023-04-05 08:59:15.530672', 53, 4),
	(73, '2023-04-06 00:36:38.095899', 66, 1),
	(74, '2023-04-06 00:36:39.716294', 66, 2),
	(75, '2023-04-06 00:36:46.468764', 66, 3),
	(76, '2023-04-06 00:36:49.557393', 66, 4),
	(77, '2023-04-05 08:59:18.599230', 53, 5),
	(78, '2023-04-05 08:59:20.099191', 53, 6),
	(79, '2023-04-05 08:59:34.048809', 53, 7),
	(80, '2023-04-05 08:59:35.090977', 53, 8),
	(81, '2023-04-05 08:59:35.784463', 53, 9),
	(82, '2023-04-06 00:36:52.911695', 66, 5),
	(83, '2023-04-06 01:14:17.073681', 66, 6),
	(84, '2023-04-06 01:10:33.511714', 66, 7),
	(85, '2023-04-05 08:59:37.263534', 53, 10),
	(86, '2023-04-05 08:59:48.894348', 53, 11),
	(87, '2023-04-05 08:10:42.171833', 53, 12),
	(88, '2023-04-05 08:59:51.837996', 53, 13),
	(89, '2023-04-05 08:59:51.960105', 53, 14),
	(90, '2023-04-05 07:16:14.004492', 67, 1),
	(91, '2023-04-05 07:16:15.305243', 67, 2),
	(92, '2023-04-05 07:16:16.751599', 67, 3),
	(93, '2023-04-05 07:16:18.374587', 67, 4),
	(94, '2023-04-05 07:16:19.990223', 67, 5),
	(95, '2023-04-05 07:16:21.666176', 67, 6),
	(96, '2023-04-05 07:16:23.265659', 67, 7),
	(97, '2023-04-05 07:16:24.627660', 67, 8),
	(98, '2023-04-05 07:16:26.108396', 67, 9),
	(99, '2023-04-05 07:16:27.510379', 67, 10),
	(100, '2023-04-05 07:16:28.931807', 67, 11),
	(101, '2023-04-05 07:16:30.526045', 67, 12),
	(102, '2023-04-05 07:17:12.289827', 67, 13),
	(103, '2023-04-05 07:17:28.923202', 67, 14),
	(104, '2023-04-05 08:59:30.056532', 66, 8),
	(105, '2023-04-05 08:59:31.076212', 66, 9),
	(106, '2023-04-05 08:59:32.968370', 66, 10),
	(107, '2023-04-05 09:00:33.369836', 66, 11),
	(108, '2023-04-05 09:00:36.428739', 66, 12),
	(109, '2023-04-05 08:59:47.797627', 66, 13),
	(110, '2023-04-05 08:50:47.886544', 66, 14),
	(111, '2023-04-06 04:38:20.284893', 47, 14);

-- 테이블 doeng.refresh_token 구조 내보내기
CREATE TABLE IF NOT EXISTS `refresh_token` (
  `rt_key` varchar(255) NOT NULL,
  `rt_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rt_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.refresh_token:~0 rows (대략적) 내보내기
DELETE FROM `refresh_token`;

-- 테이블 doeng.review 구조 내보내기
CREATE TABLE IF NOT EXISTS `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `tale_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk0ccx5i4ci2wd70vegug074w1` (`member_id`),
  KEY `FKoarqn4ben49gme16spejttic0` (`tale_id`),
  CONSTRAINT `FKk0ccx5i4ci2wd70vegug074w1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKoarqn4ben49gme16spejttic0` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.review:~19 rows (대략적) 내보내기
DELETE FROM `review`;
INSERT INTO `review` (`id`, `created_at`, `content`, `score`, `member_id`, `tale_id`) VALUES
	(1, '2023-03-24 16:52:24.000000', '백설공주 좋아해요.', 3, 15, 1),
	(2, '2023-03-24 16:52:57.000000', '4살 아기에게는 꽤 어려워요', 1, 13, 1),
	(3, '2023-03-29 04:15:34.891454', '저희애는 되게 좋아해요.', 5, 21, 1),
	(9, '2023-03-29 07:23:32.150808', '영어에 흥미가 생기길 바라봅니다!!', 5, 21, 2),
	(10, '2023-04-04 04:45:08.507897', '이 책은 우리 아이가 처음 시작할 때 배운 동화에요. 흥미로워 하는 모습이 보기 좋더라고요!!', 5, 45, 1),
	(11, '2023-04-04 05:37:05.082606', '이 동화는 저희 5살 아기에게는 좀 어려웠어요...', 3, 45, 3),
	(12, '2023-04-04 11:10:24.642151', '핵꿀잼', 5, 66, 1),
	(13, '2023-04-04 11:11:19.672931', '조금은 재미 있을지도?', 5, 53, 1),
	(14, '2023-04-05 00:41:51.155861', '재밋긴 한데 약간 아쉬워요..', 3, 66, 6),
	(15, '2023-04-05 00:42:29.177640', '좋아하는 동화인데 엄청 재밋어요~~', 4, 66, 8),
	(16, '2023-04-05 00:43:11.174265', '문제가 조금 더 다양하면 좋겠어요', 2, 66, 10),
	(17, '2023-04-05 00:45:00.919372', '이건 너무 재미있어하네요!!!', 4, 45, 5),
	(18, '2023-04-05 00:46:12.272599', '좀 길어서 재미없어요...', 3, 45, 9),
	(19, '2023-04-05 06:53:42.112258', '조금은 어렵네요 ㅠㅠㅠ', 4, 53, 4),
	(20, '2023-04-05 06:54:30.551887', '개들은 귀엽네요... 근대 내용이 영....', 3, 53, 7),
	(21, '2023-04-05 06:55:38.851346', '지하세계의 친구들! 너무 즐거웠어요!', 4, 53, 11),
	(22, '2023-04-05 07:04:04.290066', '큰일났어요!! 이 동화를 읽고 아이가 자꾸 두잉시켜달라고 떼써요!!!', 4, 67, 1),
	(23, '2023-04-05 07:09:10.883723', '재미쒀요~', 5, 67, 10),
	(24, '2023-04-05 22:48:17.549557', '4월 7일 점심은  등심돈가스 vs 김치날치알밥', 5, 47, 1);

-- 테이블 doeng.scene 구조 내보내기
CREATE TABLE IF NOT EXISTS `scene` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `background_music` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `interactive_type` int(11) NOT NULL,
  `scene_order` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tale_id` bigint(20) NOT NULL,
  `word_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKu2t0dp2pgakmir8p4cfyhxe1` (`tale_id`),
  KEY `FKg2l9evo4pc3thpj8n47k0wbj7` (`word_id`),
  CONSTRAINT `FKg2l9evo4pc3thpj8n47k0wbj7` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`),
  CONSTRAINT `FKu2t0dp2pgakmir8p4cfyhxe1` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.scene:~14 rows (대략적) 내보내기
DELETE FROM `scene`;
INSERT INTO `scene` (`id`, `background_music`, `image`, `interactive_type`, `scene_order`, `title`, `tale_id`, `word_id`) VALUES
	(1, 'background_music/happy01.mp3', 'tale/1/60013419f38d49d882e87c14d4c9f408.png', 0, 1, '엣날옛날에 백설공주가 있었어요. ', 1, NULL),
	(2, 'background_music/scary01.mp3', 'tale/1/ff493951cb974bc1a3910691946087b3.png', 0, 2, '여왕은 백설공주의 아름다움을 질투하는 마녀였어요. ', 1, NULL),
	(3, 'background_music/scary02.mp3', 'tale/1/9dc6ca76c2904b2c994aa9b49f4767b9.png', 0, 3, '여왕의 요술 거울은 백설공주가 세상에서 가장 아름답다고 말했어요. ', 1, NULL),
	(4, 'background_music/scary02.mp3', 'word/7d54f412381c4ac6aaaa0fff0281f966.png', 1, 4, '화난 얼굴을 보여줘', 1, 1),
	(5, 'background_music/mirror.mp3', 'tale/1/ad8e5029f1334ab9b95dda746b985db4.png', 0, 5, '백설 공주는 무서워서 여왕으로부터 도망쳤어요.', 1, NULL),
	(6, 'background_music/peaceful01.mp3', 'word/cff26b4915c04e118c13be86f15b0af6.png', 2, 6, '물 가져와\n', 1, 2),
	(7, 'background_music/curious01.mp3', 'tale/1/2ccaf4bfa6f44e7b91c5a92977ab0f3c.png', 0, 7, '백설공주는 작은 집을 발견했어요.\n\n', 1, NULL),
	(8, 'background_music/scary02.mp3', 'tale/1/cafea80519584c2f975816505df0f7ca.png', 0, 8, '여왕은 노인으로 모습을 바꿨어요. 그리고 그녀는 백설공주에게 독사과를 줬어요.\n\n\n', 1, NULL),
	(9, 'background_music/peaceful01.mp3', 'word/dc12734778544cd6b7fd81feee1a57fc.png', 2, 9, '사과를 가져와', 1, 10),
	(10, 'background_music/sad01.mp3', 'tale/1/d7936fb3c2e1454cb78bd0fb847579cf.png', 0, 10, '백설공주가 잠에 빠졌어요.', 1, NULL),
	(11, 'background_music/sad01.mp3', 'word/323afd535d8345a1887cbeceeb245de7.png', 1, 11, '슬픈 얼굴을 보여줘', 1, 3),
	(12, 'background_music/peaceful01.mp3', 'tale/1/c40421ea288a40b78888bc3fca510b6c.png', 0, 12, '잘생긴 왕자님이 백설공주에게 키스했어요.', 1, NULL),
	(13, 'background_music/happy01.mp3', 'tale/1/60013419f38d49d882e87c14d4c9f408.png', 0, 13, '그들은 사랑에 빠졌고 영원히 행복하게 살았답니다. ', 1, NULL),
	(14, 'background_music/happy01.mp3', 'word/cb29e3e511c34533b54dadbcc947c1b8.png', 1, 14, '행복한 얼굴을 보여줘', 1, 5);

-- 테이블 doeng.script 구조 내보내기
CREATE TABLE IF NOT EXISTS `script` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `script_order` int(11) NOT NULL,
  `voice` varchar(255) NOT NULL,
  `scene_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl9tlxsl8ra8aj4oif37ruhdxm` (`scene_id`),
  CONSTRAINT `FKl9tlxsl8ra8aj4oif37ruhdxm` FOREIGN KEY (`scene_id`) REFERENCES `scene` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.script:~28 rows (대략적) 내보내기
DELETE FROM `script`;
INSERT INTO `script` (`id`, `content`, `script_order`, `voice`, `scene_id`) VALUES
	(1, 'Once upon a time, Snow White lives in a palace.', 1, 'tale/1/cf0896e7a94f4011beeead794d90993b.mp3', 1),
	(2, '옛날 옛날에 백설 공주가 성안에 살았어요.', 2, 'tale/1/7f834a82dff9448d994709286b09efc0.mp3', 1),
	(3, 'The queen is a witch. she is jealous of Snow White\'s beauty.', 1, 'tale/1/ccbdc0a4cc2541cbaffa703b61b21347.mp3', 2),
	(4, 'The Queen\'s Magic Mirror says "Snow White is the most beautiful in the world."\nSo she is angry.', 1, 'tale/1/18351cc4ad4d41b1b27d2d3c3769222b.mp3', 3),
	(5, 'show your angry face!', 1, 'tale/1/c686ad6746dd4004b18c276fcd773af6.mp3', 4),
	(6, 'Snow White runs away from the queen because she is scared.', 1, 'tale/1/831a83ac6de74b1ab7061f44d8b986c1.mp3', 5),
	(7, 'bring a cup of water!', 1, 'tale/1/4747c2f1b09146b2b5ea42ba4ec586de.mp3', 6),
	(8, 'Snow White finds a little house. The dwarfs let Snow White live in the house.', 1, 'tale/1/c0c76c1f1a284abc870180678f9b8fb8.mp3', 7),
	(9, 'The queen changes her appearance to an old man. And she gives Snow White a poisonous apple.', 1, 'tale/1/082deabcb2fe4624893f4cde22f3cda9.mp3', 8),
	(10, 'bring an apple!', 1, 'tale/1/ec280df172954f82a9cee0ba9e18de59.mp3', 9),
	(11, 'Snow White falls into a deep sleep. The dwarves are sad.', 1, 'tale/1/6cf1481e816b422cac543d27918cd3f5.mp3', 10),
	(12, 'show your sad face!', 1, 'tale/1/b38f50eee5f240588660757502cdb95c.mp3', 11),
	(13, 'A handsome prince comes and kisses Snow White. She wakes up.', 1, 'tale/1/fbe2de8ed2e44a58a952aab08f23b693.mp3', 12),
	(14, 'They fall in love and live happily ever after.', 1, 'tale/1/cb4bef3f29ac41f3943136673f5f6ff4.mp3', 13),
	(15, 'show your happy face!', 1, 'tale/1/60564c3d63a6467f9707102e535f4b0c.mp3', 14),
	(16, '여왕은 백설공주의 아름다움을 질투하는 마녀였어요. ', 2, 'tale/1/822232d73d9a4e7fabe3e52cec498cd9.mp3', 2),
	(17, '여왕의 요술 거울은 백설공주가 세상에서 가장 아름답다고 말했어요. 그래서 여왕은 화가 났어요. ', 2, 'tale/1/f5aba2fe6e044983bf8f1964eb84e844.mp3', 3),
	(18, '너의 화난 얼굴을 보여줘!', 2, 'tale/1/4200b3e4b3ef4163be4f72b36febc5cf.mp3', 4),
	(19, '백설 공주는 무서워서 여왕으로부터 도망쳤어요.', 2, 'tale/1/589ec229af9f46328b2d13c47193b46b.mp3', 5),
	(20, '물 한잔 가져다 줘!', 2, 'tale/1/c0815fc88e2545c895b1593c75ad0784.mp3', 6),
	(21, '백설공주는 작은 집을 발견했어요. 난쟁이들이 백설공주가 집에 살게해줬어요.', 2, 'tale/1/32ac435f06d04f68b7b11ea4f37adab8.mp3', 7),
	(22, '여왕은 노인으로 모습을 바꿨어요. 그리고 그녀는 백설공주에게 독사과를 줬어요.', 2, 'tale/1/55b60dadceec416b88a727fd1e70a838.mp3', 8),
	(23, '사과를 가져와\n', 2, 'tale/1/4874eaf960fc449597901d3975061fb3.mp3', 9),
	(24, '백설공주가 잠에 빠졌어요. 난쟁이들은 슬펐어요. \n', 2, 'tale/1/910055539aad4ef29ea9ccba8590555f.mp3', 10),
	(25, '너의 슬픈 얼굴을 보여줘\n', 2, 'tale/1/53f30c95b05e4af88d51e155de01d050.mp3', 11),
	(26, '잘생긴 왕자님이 백설공주에게 키스했어요. 그녀는 일어났어요. \n', 2, 'tale/1/ffdfa93bdac5461f8a36a6f777f23f6b.mp3', 12),
	(27, '그들은 사랑에 빠졌고 영원히 행복하게 살았답니다. \n', 2, 'tale/1/72db1b201a6744baa8403faae9cf4870.mp3', 13),
	(28, '너의 행복한 얼굴을 보여줘 \n', 2, 'tale/1/07bf614123944620a55fd86c8921cb39.mp3', 14);

-- 테이블 doeng.tale 구조 내보내기
CREATE TABLE IF NOT EXISTS `tale` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `background_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `main_image` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.tale:~11 rows (대략적) 내보내기
DELETE FROM `tale`;
INSERT INTO `tale` (`id`, `background_image`, `description`, `main_image`, `price`, `title`) VALUES
	(1, 'tale/1/2ccaf4bfa6f44e7b91c5a92977ab0f29.png', 'Snow White', 'tale/1/2ccaf4bfa6f44e7b91c5a92977ab0f21.png', 200000, 'Snow White'),
	(2, 'tale/2/2ccaf4bfa6f44e7b91c5a92977ab0f22.png', 'Animal Farm', 'tale/2/2ccaf4bfa6f44e7b91c5a92977ab0f22.png', 200000, 'Animal Farm'),
	(3, 'tale/3/2ccaf4bfa6f44e7b91c5a92977ab0f25.png', 'Under the sea', 'tale/3/2ccaf4bfa6f44e7b91c5a92977ab0f25.png', 100000, 'Under the sea'),
	(4, 'tale/4/2ccaf4bfa6f44e7b91c5a92977ab0f28.png', 'Alice in wonderlandThe three pigs', 'tale/4/2ccaf4bfa6f44e7b91c5a92977ab0f28.png', 150000, 'The three pigs'),
	(5, 'tale/5/2ccaf4bfa6f44e7b91c5a92977ab0f24.png', 'Alice in wonderland', 'tale/5/2ccaf4bfa6f44e7b91c5a92977ab0f24.png', 180000, 'Alice in wonderland'),
	(6, 'tale/6/2ccaf4bfa6f44e7b91c5a92977ab0f27.png', 'Cat\'s in Boots', 'tale/6/2ccaf4bfa6f44e7b91c5a92977ab0f27.png', 140000, 'Cat\'s in Boots'),
	(7, 'tale/7/2ccaf4bfa6f44e7b91c5a92977ab0f30.png', 'Moa and Monami', 'tale/7/2ccaf4bfa6f44e7b91c5a92977ab0f30.png', 130000, 'Moa and Monami'),
	(8, 'tale/8/2ccaf4bfa6f44e7b91c5a92977ab0f26.png', 'Jack and the beanstalk', 'tale/8/2ccaf4bfa6f44e7b91c5a92977ab0f26.png', 200000, 'Jack and the beanstalk'),
	(9, 'tale/9/2ccaf4bfa6f44e7b91c5a92977ab0f31.png', 'Lady Fox', 'tale/9/2ccaf4bfa6f44e7b91c5a92977ab0f31.png', 150000, 'Lady Fox'),
	(10, 'tale/10/2ccaf4bfa6f44e7b91c5a92977ab0f32.png', 'Cow Boy', 'tale/10/2ccaf4bfa6f44e7b91c5a92977ab0f32.png', 160000, 'Cow Boy'),
	(11, 'tale/11/2ccaf4bfa6f44e7b91c5a92977ab0f33.png', 'Underground', 'tale/11/2ccaf4bfa6f44e7b91c5a92977ab0f33.png', 180000, 'Underground');

-- 테이블 doeng.tale_has_material 구조 내보내기
CREATE TABLE IF NOT EXISTS `tale_has_material` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `material_id` bigint(20) NOT NULL,
  `tale_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgjisoc2ls0gxdnsp2xm9aeby2` (`material_id`),
  KEY `FKbvk2sttai1lmo4k561mum87j` (`tale_id`),
  CONSTRAINT `FKbvk2sttai1lmo4k561mum87j` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`),
  CONSTRAINT `FKgjisoc2ls0gxdnsp2xm9aeby2` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.tale_has_material:~0 rows (대략적) 내보내기
DELETE FROM `tale_has_material`;

-- 테이블 doeng.test 구조 내보내기
CREATE TABLE IF NOT EXISTS `test` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_correct` tinyint(1) DEFAULT 1,
  `test_count` int(11) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `tale_id` bigint(20) NOT NULL,
  `word_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK56mehfusquk83x0twm4rto41p` (`member_id`),
  KEY `FKj4q6alhv9698ucii7y2s3512q` (`tale_id`),
  KEY `FKam6sq1btentle8c16sernha0m` (`word_id`),
  CONSTRAINT `FK56mehfusquk83x0twm4rto41p` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKam6sq1btentle8c16sernha0m` FOREIGN KEY (`word_id`) REFERENCES `word` (`id`),
  CONSTRAINT `FKj4q6alhv9698ucii7y2s3512q` FOREIGN KEY (`tale_id`) REFERENCES `tale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.test:~170 rows (대략적) 내보내기
DELETE FROM `test`;
INSERT INTO `test` (`id`, `is_correct`, `test_count`, `member_id`, `tale_id`, `word_id`) VALUES
	(1, 1, 1, 53, 1, 1),
	(2, 1, 1, 53, 1, 2),
	(3, 1, 1, 53, 1, 10),
	(4, 1, 1, 53, 1, 3),
	(5, 1, 1, 53, 1, 5),
	(6, 1, 1, 15, 1, 1),
	(7, 0, 1, 15, 1, 2),
	(8, 0, 1, 15, 1, 10),
	(9, 1, 1, 15, 1, 3),
	(10, 1, 1, 15, 1, 5),
	(11, 1, 2, 53, 1, 1),
	(12, 1, 2, 53, 1, 2),
	(13, 1, 2, 53, 1, 10),
	(14, 1, 2, 53, 1, 3),
	(15, 1, 2, 53, 1, 5),
	(16, 1, 3, 53, 1, 1),
	(17, 1, 3, 53, 1, 2),
	(18, 1, 3, 53, 1, 10),
	(19, 1, 3, 53, 1, 3),
	(20, 1, 3, 53, 1, 5),
	(21, 1, 4, 53, 1, 1),
	(22, 1, 4, 53, 1, 2),
	(23, 1, 4, 53, 1, 10),
	(24, 1, 4, 53, 1, 3),
	(25, 1, 4, 53, 1, 5),
	(26, 1, 5, 53, 1, 1),
	(27, 1, 5, 53, 1, 2),
	(28, 1, 5, 53, 1, 10),
	(29, 1, 5, 53, 1, 3),
	(30, 1, 5, 53, 1, 5),
	(31, 1, 1, 67, 1, 1),
	(32, 1, 1, 67, 1, 2),
	(33, 1, 1, 67, 1, 10),
	(34, 1, 1, 67, 1, 3),
	(35, 1, 1, 67, 1, 5),
	(36, 1, 1, 21, 1, 1),
	(37, 1, 1, 21, 1, 2),
	(38, 0, 1, 21, 1, 10),
	(39, 1, 1, 21, 1, 3),
	(40, 1, 1, 21, 1, 5),
	(41, 1, 2, 15, 1, 1),
	(42, 1, 2, 15, 1, 2),
	(43, 0, 2, 15, 1, 10),
	(44, 0, 2, 15, 1, 3),
	(45, 1, 2, 15, 1, 5),
	(46, 1, 3, 15, 1, 1),
	(47, 0, 3, 15, 1, 2),
	(48, 1, 3, 15, 1, 10),
	(49, 1, 3, 15, 1, 3),
	(50, 1, 3, 15, 1, 5),
	(51, 0, 4, 15, 1, 1),
	(52, 0, 4, 15, 1, 2),
	(53, 0, 4, 15, 1, 10),
	(54, 1, 4, 15, 1, 3),
	(55, 0, 4, 15, 1, 5),
	(56, 1, 5, 15, 1, 1),
	(57, 0, 5, 15, 1, 2),
	(58, 1, 5, 15, 1, 10),
	(59, 0, 5, 15, 1, 3),
	(60, 1, 5, 15, 1, 5),
	(61, 0, 6, 15, 1, 1),
	(62, 0, 6, 15, 1, 2),
	(63, 0, 6, 15, 1, 10),
	(64, 0, 6, 15, 1, 3),
	(65, 0, 6, 15, 1, 5),
	(66, 1, 7, 15, 1, 1),
	(67, 1, 7, 15, 1, 2),
	(68, 1, 7, 15, 1, 10),
	(69, 0, 7, 15, 1, 3),
	(70, 1, 7, 15, 1, 5),
	(71, 1, 1, 66, 1, 1),
	(72, 1, 1, 66, 1, 2),
	(73, 0, 1, 66, 1, 10),
	(74, 0, 1, 66, 1, 3),
	(75, 1, 1, 66, 1, 5),
	(76, 1, 8, 15, 1, 1),
	(77, 0, 8, 15, 1, 2),
	(78, 0, 8, 15, 1, 10),
	(79, 1, 8, 15, 1, 3),
	(80, 1, 8, 15, 1, 5),
	(81, 0, 9, 15, 1, 1),
	(82, 0, 9, 15, 1, 2),
	(83, 1, 9, 15, 1, 10),
	(84, 0, 9, 15, 1, 3),
	(85, 0, 9, 15, 1, 5),
	(86, 1, 2, 66, 1, 1),
	(87, 1, 2, 66, 1, 2),
	(88, 0, 2, 66, 1, 10),
	(89, 1, 2, 66, 1, 3),
	(90, 1, 2, 66, 1, 5),
	(91, 1, 6, 53, 1, 1),
	(92, 1, 6, 53, 1, 2),
	(93, 1, 6, 53, 1, 10),
	(94, 1, 6, 53, 1, 3),
	(95, 1, 6, 53, 1, 5),
	(96, 1, 2, 21, 1, 1),
	(97, 0, 2, 21, 1, 2),
	(98, 0, 2, 21, 1, 10),
	(99, 0, 2, 21, 1, 3),
	(100, 0, 2, 21, 1, 5),
	(101, 1, 1, 47, 1, 1),
	(102, 1, 1, 47, 1, 2),
	(103, 1, 1, 47, 1, 10),
	(104, 1, 1, 47, 1, 3),
	(105, 1, 1, 47, 1, 5),
	(106, 1, 2, 47, 1, 1),
	(107, 1, 2, 47, 1, 2),
	(108, 1, 2, 47, 1, 10),
	(109, 1, 2, 47, 1, 3),
	(110, 1, 2, 47, 1, 5),
	(111, 0, 10, 15, 1, 1),
	(112, 0, 10, 15, 1, 2),
	(113, 0, 10, 15, 1, 10),
	(114, 0, 10, 15, 1, 3),
	(115, 0, 10, 15, 1, 5),
	(116, 0, 11, 15, 1, 1),
	(117, 0, 11, 15, 1, 2),
	(118, 0, 11, 15, 1, 10),
	(119, 0, 11, 15, 1, 3),
	(120, 0, 11, 15, 1, 5),
	(121, 1, 12, 15, 1, 1),
	(122, 0, 12, 15, 1, 2),
	(123, 0, 12, 15, 1, 10),
	(124, 0, 12, 15, 1, 3),
	(125, 0, 12, 15, 1, 5),
	(126, 1, 13, 15, 1, 1),
	(127, 1, 13, 15, 1, 2),
	(128, 0, 13, 15, 1, 10),
	(129, 0, 13, 15, 1, 3),
	(130, 0, 13, 15, 1, 5),
	(131, 0, 14, 15, 1, 1),
	(132, 1, 14, 15, 1, 2),
	(133, 1, 14, 15, 1, 10),
	(134, 1, 14, 15, 1, 3),
	(135, 0, 14, 15, 1, 5),
	(136, 1, 15, 15, 1, 1),
	(137, 1, 15, 15, 1, 2),
	(138, 1, 15, 15, 1, 10),
	(139, 1, 15, 15, 1, 3),
	(140, 0, 15, 15, 1, 5),
	(141, 1, 16, 15, 1, 1),
	(142, 1, 16, 15, 1, 2),
	(143, 1, 16, 15, 1, 10),
	(144, 1, 16, 15, 1, 3),
	(145, 1, 16, 15, 1, 5),
	(146, 1, 17, 15, 1, 1),
	(147, 1, 17, 15, 1, 2),
	(148, 1, 17, 15, 1, 10),
	(149, 1, 17, 15, 1, 3),
	(150, 0, 17, 15, 1, 5),
	(151, 1, 1, 45, 1, 1),
	(152, 1, 1, 45, 1, 2),
	(153, 1, 1, 45, 1, 10),
	(154, 1, 1, 45, 1, 3),
	(155, 0, 1, 45, 1, 5),
	(156, 0, 2, 45, 1, 1),
	(157, 1, 2, 45, 1, 2),
	(158, 0, 2, 45, 1, 10),
	(159, 1, 2, 45, 1, 3),
	(160, 0, 2, 45, 1, 5),
	(161, 0, 18, 15, 1, 1),
	(162, 1, 18, 15, 1, 2),
	(163, 1, 18, 15, 1, 10),
	(164, 0, 18, 15, 1, 3),
	(165, 1, 18, 15, 1, 5),
	(166, 1, 19, 15, 1, 1),
	(167, 0, 19, 15, 1, 2),
	(168, 0, 19, 15, 1, 10),
	(169, 1, 19, 15, 1, 3),
	(170, 1, 19, 15, 1, 5);

-- 테이블 doeng.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(512) NOT NULL,
  `email_verified_yn` varchar(1) NOT NULL,
  `modified_at` datetime(6) NOT NULL,
  `password` varchar(128) NOT NULL,
  `profile_image_url` varchar(512) NOT NULL,
  `provider_type` varchar(20) NOT NULL,
  `role_type` varchar(20) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_a3imlf41l37utmxiquukk8ajc` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.user:~1 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`user_seq`, `created_at`, `email`, `email_verified_yn`, `modified_at`, `password`, `profile_image_url`, `provider_type`, `role_type`, `user_id`, `username`) VALUES
	(1, '2023-03-16 16:48:19.395070', 'NO_EMAIL', 'Y', '2023-03-16 16:48:19.395070', 'NO_PASS', 'http://k.kakaocdn.net/dn/q0O2I/btr1pWCDq9G/QOPvCnR1CdY8Rmh2vmLZ1K/img_110x110.jpg', 'KAKAO', 'USER', '2708232627', '임혜은');

-- 테이블 doeng.user_refresh_token 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_refresh_token` (
  `refresh_token_seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(256) NOT NULL,
  `user_id` varchar(64) NOT NULL,
  PRIMARY KEY (`refresh_token_seq`),
  UNIQUE KEY `UK_qca3mjxv5a1egwmn4wnbplfkt` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.user_refresh_token:~1 rows (대략적) 내보내기
DELETE FROM `user_refresh_token`;
INSERT INTO `user_refresh_token` (`refresh_token_seq`, `refresh_token`, `user_id`) VALUES
	(1, 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MjZEOTZDOTAwMzBERDU4NDI5RDI3NTFBQzFCREJCQyIsImV4cCI6MTY3OTU1NzY5OX0.3MkgWPb-VgX_c-07fsWKfdUSCFeas1Zg-fpYThU6tpQ', '2708232627');

-- 테이블 doeng.word 구조 내보내기
CREATE TABLE IF NOT EXISTS `word` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `eng_word` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `kor_word` varchar(255) NOT NULL,
  `voice` varchar(255) NOT NULL,
  `kor_voice` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 doeng.word:~9 rows (대략적) 내보내기
DELETE FROM `word`;
INSERT INTO `word` (`id`, `eng_word`, `image`, `kor_word`, `voice`, `kor_voice`) VALUES
	(1, 'angry', 'word/7d54f412381c4ac6aaaa0fff0281f966.png', '화남', 'word/2de2294ba12a4eef9e7ff38f15a78b40.mp3', 'word/2de2294ba12a4eef9e7ff38f15a78b41.mp3'),
	(2, 'cup', 'word/cff26b4915c04e118c13be86f15b0af6.png', '컵', 'word/dfca28495a184e1996debbc887bcded5.mp3', 'word/dfca28495a184e1996debbc887bcded6.mp3'),
	(3, 'sad', 'word/323afd535d8345a1887cbeceeb245de7.png', '슬픔\n', 'word/a6a683f5188e42fc9e0ce57af36fefd3.mp3', 'word/a6a683f5188e42fc9e0ce57af36fefd4.mp3'),
	(4, 'donut', 'word/7b0d88c8a15249b588a913353a1e9798.png', '도넛', 'word/4862af4209ca4706b68c403e15f7b312.mp3', ''),
	(5, 'happy', 'word/cb29e3e511c34533b54dadbcc947c1b8.png', '행복\n', 'word/83d2dae1fd9947f3aeef2a9c7e0612ea.mp3', 'word/83d2dae1fd9947f3aeef2a9c7e0612eb.mp3'),
	(6, 'proud', 'word/bf0d8e40dcb24abeb62dff13b547377a.png', '자랑스러움\n', 'word/018d258b60a74660a692ac1494d89055.mp3', ''),
	(7, 'scary', 'word/6f518de4bf624e7c9b1f2fde2c895493.png', '두려움\n\n', 'word/b70e4e3ad1c1411cb536b85676b6c715.mp3', ''),
	(8, 'sleepy', 'word/466fe658443444f6a6246de91eaa6b03.png', '졸림\n', 'word/52071338f45c406b90d0a85b679f78ab.mp3', ''),
	(9, 'watermelon', 'word/25c03675dc054672b564361de1b655c9.png', '수박\n', 'word/3ca2bb8718544e08aec99d6de0f109ad.mp3', ''),
	(10, 'apple', 'word/dc12734778544cd6b7fd81feee1a57fc.png', '사과\n', 'word/4398e1cf1e04429caaf68b2fcd039616.mp3', 'word/4398e1cf1e04429caaf68b2fcd039617.mp3');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
