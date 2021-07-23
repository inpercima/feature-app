-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 23. Jul 2021 um 11:49
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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_admin`
--

CREATE TABLE `fa_admin` (
  `accountName` varchar(50) NOT NULL,
  `featuredTag` varchar(50) NOT NULL,
  `dateTag` varchar(50) NOT NULL,
  `locations` varchar(2000) NOT NULL,
  `photographer` varchar(2000) NOT NULL,
  `tags` varchar(2000) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fa_admin`
--

INSERT INTO `fa_admin` (`accountName`, `featuredTag`, `dateTag`, `locations`, `photographer`, `tags`, `startDate`) VALUES
('instagram', 'igers', 'universe', 'London,Berlin,Rom,Paris,Oslo', 'Brian_on_instagram,steve_photos,jason_germany_photo', '#mytag #myothertag #instagramtag #ig_tag #ig_tag_two', '2017-09-02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_calendar`
--

CREATE TABLE `fa_calendar` (
  `id` int(3) NOT NULL,
  `representativeMember` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fa_calendar`
--

INSERT INTO `fa_calendar` (`id`, `representativeMember`, `date`) VALUES
(1, 'instaSteve', '2021-07-23');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_note`
--

CREATE TABLE `fa_note` (
  `id` int(3) NOT NULL,
  `member` varchar(50) NOT NULL,
  `text` mediumtext NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fa_note`
--

INSERT INTO `fa_note` (`id`, `member`, `text`, `title`, `date`) VALUES
(1, 'Steve', 'This is a simple note.', 'first note', '2021-06-01'),
(2, 'Brian', 'Another note to show how easy this is.', 'easy way', '2021-06-02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_post`
--

CREATE TABLE `fa_post` (
  `id` int(3) NOT NULL,
  `date` date NOT NULL,
  `photographer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fa_post`
--

INSERT INTO `fa_post` (`id`, `date`, `photographer`) VALUES
(1, '2021-06-01', 'ig_italy'),
(2, '2021-06-02', 'ig_deutschland'),
(3, '2021-06-03', 'ig_leipzig');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fa_user`
--

CREATE TABLE `fa_user` (
  `id` int(3) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fa_user`
--

INSERT INTO `fa_user` (`id`, `username`, `password`, `name`) VALUES
(1, 'instaJason', '$2y$10$vsyuZDwhUervhRWrEwM1KeiaPCASukQNkfL/qki00CRLbjqphJI1y', 'Jason'),
(2, 'instaSteve', '$2y$10$9qpHuo2HBDLttXKkVsKJjOonN49ICrEMw0pdKGRIj5Iw6LTKUxYTO', 'Steve'),
(3, 'instaBrian', '$2y$10$kaR2eCKuZEo1Qwm5idkEJe422ztU32mvJC4FrSs/MEw4AmIKoaKTC', 'Brian');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `fa_calendar`
--
ALTER TABLE `fa_calendar`
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
-- Indizes für die Tabelle `fa_user`
--
ALTER TABLE `fa_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `fa_calendar`
--
ALTER TABLE `fa_calendar`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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

--
-- AUTO_INCREMENT für Tabelle `fa_user`
--
ALTER TABLE `fa_user`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
