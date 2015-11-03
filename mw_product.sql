-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2015 at 11:56 PM
-- Server version: 5.6.26
-- PHP Version: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csashesi_prophet-agyeman-prempeh`
--

-- --------------------------------------------------------

--
-- Table structure for table `mw_product`
--

CREATE TABLE IF NOT EXISTS `mw_product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` double(30,2) NOT NULL,
  `product_quantity` double(10,0) NOT NULL,
  `product_barcode` varchar(6) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mw_product`
--

INSERT INTO `mw_product` (`product_id`, `product_name`, `product_price`, `product_quantity`, `product_barcode`) VALUES
(1, 'Pineapple Juice', 2.00, 50, '354826'),
(2, 'Banana Cake', 5.00, 20, '648254');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mw_product`
--
ALTER TABLE `mw_product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mw_product`
--
ALTER TABLE `mw_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
