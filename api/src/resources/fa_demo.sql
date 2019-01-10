-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 10. Jan 2019 um 17:40
-- Server-Version: 5.7.23
-- PHP-Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `fa_demo`
--
CREATE DATABASE IF NOT EXISTS `fa_demo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `fa_demo`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_admin`
--

CREATE TABLE `fa_admin` (
  `id` int(1) NOT NULL,
  `accountName` varchar(50) NOT NULL,
  `featuredTag` varchar(50) NOT NULL,
  `dateTag` varchar(50) NOT NULL,
  `locations` varchar(2000) NOT NULL,
  `photographer` varchar(2000) NOT NULL,
  `tags` varchar(2000) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fa_admin`
--

INSERT INTO `fa_admin` (`id`, `accountName`, `featuredTag`, `dateTag`, `locations`, `photographer`, `tags`, `startDate`) VALUES
(1, 'instagram', 'igers', 'universe', 'London,Berlin,Rom,Paris,Oslo', 'Brian_on_instagram,steve_photos,jason_germany_photo', '#mytag #myothertag #instagramtag #ig_tag #ig_tag_two', '2017-09-02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_calendar`
--

CREATE TABLE `fa_calendar` (
  `id` int(3) NOT NULL,
  `representativeMember` varchar(50) NOT NULL,
  `date` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fa_calendar`
--

INSERT INTO `fa_calendar` (`id`, `representativeMember`, `date`) VALUES
(1, 'Brian', 'Samstag, 01.12.2018');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_member`
--

CREATE TABLE `fa_member` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fa_member`
--

INSERT INTO `fa_member` (`id`, `name`, `username`) VALUES
(1, 'Jason', 'instaJason'),
(2, 'Brian', 'instaBrian'),
(3, 'Steve', 'instaSteve');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_note`
--

CREATE TABLE `fa_note` (
  `id` int(3) NOT NULL,
  `member` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fa_note`
--

INSERT INTO `fa_note` (`id`, `member`, `text`, `title`, `date`) VALUES
(1, 'Steve', 'This is a simple note.', 'first note', '2018-11-17'),
(2, 'Brian', 'Another note to show how easy this is.', 'easy way', '2018-11-17');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_post`
--

CREATE TABLE `fa_post` (
  `id` int(3) NOT NULL,
  `date` date NOT NULL,
  `photographer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fa_post`
--

INSERT INTO `fa_post` (`id`, `date`, `photographer`) VALUES
(1, '2018-11-05', 'instagram'),
(2, '2018-11-06', 'ig_leipzig'),
(3, '2018-11-07', 'ig_deutschland');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `fa_admin`
--
ALTER TABLE `fa_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fa_calendar`
--
ALTER TABLE `fa_calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fa_member`
--
ALTER TABLE `fa_member`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fa_note`
--
ALTER TABLE `fa_note`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fa_post`
--
ALTER TABLE `fa_post`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `fa_admin`
--
ALTER TABLE `fa_admin`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `fa_calendar`
--
ALTER TABLE `fa_calendar`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `fa_member`
--
ALTER TABLE `fa_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `fa_note`
--
ALTER TABLE `fa_note`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `fa_post`
--
ALTER TABLE `fa_post`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
