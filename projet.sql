-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 06:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projet`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `prix` float NOT NULL,
  `nombreplace` int(11) NOT NULL,
  `placereservee` int(11) NOT NULL,
  `numTel` int(11) NOT NULL,
  `lien` varchar(555) NOT NULL,
  `lieu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `titre`, `Description`, `date`, `prix`, `nombreplace`, `placereservee`, `numTel`, `lien`, `lieu`) VALUES
(5, 'aaa', 'aa', '2024-02-01 00:00:00', 15, 1, 1, 53156311, '0', 'aaa'),
(6, 'aa', 'aa', '2024-01-01 00:00:00', 22, 15, 1, 654654, 'https://www.youtube.com/watch?v=hRBKvrsI_IY', 'aaa'),
(7, 'aaa', 'aa', '2024-01-01 00:00:00', 15, 1, 1, 654654, '0', 'aa'),
(8, 'aa', 'aaa', '2024-01-31 00:00:00', 132, 31, 1, 2147483647, '0', 'aa');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(4, 'staticuser', 'staticuser@example.com', 'staticpassword', '1'),
(5, 'staticuser', 'staticuser@example.com', 'staticpassword', '1'),
(6, 'testuser', 'test@example.com', 'password', '1'),
(7, 'testuser', 'test@example.com', 'password', '1'),
(8, 'testuser', 'test@example.com', 'password', '1'),
(9, 'testuser', 'aaaa@example.com', 'password', '1'),
(10, 'oussaama', 'aaaaaaa@gmail.com', 'oussama', '1'),
(11, 'aa', 'aa@gmail.com', 'aa', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
