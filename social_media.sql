-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 17, 2024 lúc 10:44 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `social_media`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `block`
--

CREATE TABLE `block` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `blockerId` varchar(191) NOT NULL,
  `blockedId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `desc` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `desc`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(12, 'Oh, you\'re so handsome boy !', '2024-07-17 06:28:56.267', '2024-07-17 06:28:56.267', 'user_2jDoj9ADRIVrkX7ShGOkcerOx1v', 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `follower`
--

CREATE TABLE `follower` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `followerId` varchar(191) NOT NULL,
  `followingId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `follower`
--

INSERT INTO `follower` (`id`, `createdAt`, `followerId`, `followingId`) VALUES
(2, '2024-07-15 08:12:54.519', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1', 'user_2jDoj9ADRIVrkX7ShGOkcerOx1v'),
(3, '2024-07-15 08:17:28.929', 'user_2jDoj9ADRIVrkX7ShGOkcerOx1v', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1'),
(5, '2024-07-17 08:28:02.729', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1', 'user_2jMkR760EurvSB7f0Wy6fERCnOv'),
(6, '2024-07-17 08:29:36.587', 'user_2jMkR760EurvSB7f0Wy6fERCnOv', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `followrequest`
--

CREATE TABLE `followrequest` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `senderId` varchar(191) NOT NULL,
  `receiverId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `like`
--

CREATE TABLE `like` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` varchar(191) NOT NULL,
  `postId` int(11) NOT NULL,
  `commentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `like`
--

INSERT INTO `like` (`id`, `createdAt`, `userId`, `postId`, `commentId`) VALUES
(13, '2024-07-17 06:28:39.836', 'user_2jDoj9ADRIVrkX7ShGOkcerOx1v', 14, NULL),
(14, '2024-07-17 08:42:40.959', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1', 14, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `desc` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `userId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `desc`, `image`, `createdAt`, `updatedAt`, `userId`) VALUES
(14, 'Hello world ^^', 'http://res.cloudinary.com/dqbg3vtet/image/upload/v1721129017/uploads/mi5m6dmhuldqcys2xujk.jpg', '2024-07-16 11:23:42.319', '2024-07-16 11:23:42.319', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `story`
--

CREATE TABLE `story` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiredAt` datetime(3) NOT NULL,
  `image` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `story`
--

INSERT INTO `story` (`id`, `createdAt`, `expiredAt`, `image`, `userId`) VALUES
(5, '2024-07-17 06:25:56.273', '2024-07-18 06:25:56.271', 'http://res.cloudinary.com/dqbg3vtet/image/upload/v1721197553/uploads/gwutm9l1f2wlpg7wzc7i.jpg', 'user_2jB63f69Tt9vOMLYG8jwd72Sxh1'),
(10, '2024-07-17 07:19:51.194', '2024-07-18 07:19:51.192', 'http://res.cloudinary.com/dqbg3vtet/image/upload/v1721200788/uploads/l6fa3koulnox56nnivl9.jpg', 'user_2jDoj9ADRIVrkX7ShGOkcerOx1v');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `cover` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `surname` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `school` varchar(191) DEFAULT NULL,
  `work` varchar(191) DEFAULT NULL,
  `website` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `avatar`, `cover`, `name`, `surname`, `description`, `city`, `school`, `work`, `website`, `createdAt`) VALUES
('user_2jB63f69Tt9vOMLYG8jwd72Sxh1', 'tuan24072002', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJqR3p2Z1l1TTRZZzBQbzdYTTl6cVFGODJndCJ9', 'http://res.cloudinary.com/dqbg3vtet/image/upload/v1721129046/uploads/p8zou5fdoe6fx7pul6hf.jpg', 'Anh Tuấn', 'Trần Lê', 'Have a nice day ^^', 'HCMC', 'HUIT', 'Hung Minh', 'tuan.dev', '2024-07-13 05:18:48.020'),
('user_2jDoj9ADRIVrkX7ShGOkcerOx1v', 'tuan2002', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yakRvakMwemFBaVNFaU9Hb3FpUjluWFI3MUIifQ', 'http://res.cloudinary.com/dqbg3vtet/image/upload/v1721036075/uploads/lk3fwwkgyhecwjwto45n.png', 'Tuấn', 'Trần', 'Good day ^^', 'HCMC', 'HUIT', 'ABC', NULL, '2024-07-14 04:25:42.390'),
('user_2jMkR760EurvSB7f0Wy6fERCnOv', 'tuan123', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yak1rUjNHVkhtakdLeWFVeXRlcXpNb0N4WXYifQ', '/noCover.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-17 08:18:43.326');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1b2cb823-30a4-4aa9-b980-2c047bb00570', '9f79c477e27644b552b68de7efbf6985fc3ba81c42981c8ecb87b369cd20b47a', '2024-07-13 04:30:56.349', '20240713042614_social', NULL, NULL, '2024-07-13 04:30:55.753', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Block_blockerId_blockedId_key` (`blockerId`,`blockedId`),
  ADD KEY `Block_blockedId_fkey` (`blockedId`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_userId_fkey` (`userId`),
  ADD KEY `Comment_postId_fkey` (`postId`);

--
-- Chỉ mục cho bảng `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Follower_followerId_fkey` (`followerId`),
  ADD KEY `Follower_followingId_fkey` (`followingId`);

--
-- Chỉ mục cho bảng `followrequest`
--
ALTER TABLE `followrequest`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `FollowRequest_senderId_receiverId_key` (`senderId`,`receiverId`),
  ADD KEY `FollowRequest_receiverId_fkey` (`receiverId`);

--
-- Chỉ mục cho bảng `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Like_userId_fkey` (`userId`),
  ADD KEY `Like_postId_fkey` (`postId`),
  ADD KEY `Like_commentId_fkey` (`commentId`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Post_userId_fkey` (`userId`);

--
-- Chỉ mục cho bảng `story`
--
ALTER TABLE `story`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Story_userId_key` (`userId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`);

--
-- Chỉ mục cho bảng `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `block`
--
ALTER TABLE `block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `follower`
--
ALTER TABLE `follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `followrequest`
--
ALTER TABLE `followrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT cho bảng `like`
--
ALTER TABLE `like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `story`
--
ALTER TABLE `story`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `Block_blockedId_fkey` FOREIGN KEY (`blockedId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Block_blockerId_fkey` FOREIGN KEY (`blockerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `Follower_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Follower_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `followrequest`
--
ALTER TABLE `followrequest`
  ADD CONSTRAINT `FollowRequest_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FollowRequest_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `Like_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `story`
--
ALTER TABLE `story`
  ADD CONSTRAINT `Story_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
