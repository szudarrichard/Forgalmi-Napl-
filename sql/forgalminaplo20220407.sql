-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 07. 20:19
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `forgalminaplo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `userName` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `phoneNum` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `permission` tinyint(4) NOT NULL,
  `schoolID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`ID`, `userName`, `password`, `phoneNum`, `email`, `status`, `permission`, `schoolID`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '06207777777', 'admin@admin.hu', 1, 3, 1),
(4, 'admin2', 'd033e22ae348aeb5660fc2140aec35850c4da997', '1231231231', 'admin2@admin.hu', 1, 3, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car`
--

CREATE TABLE `car` (
  `ID` int(11) NOT NULL,
  `teacherID` int(30) NOT NULL,
  `plateNum` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `sumKM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `car`
--

INSERT INTO `car` (`ID`, `teacherID`, `plateNum`, `sumKM`) VALUES
(1, 1, 'AAA-827', 937051),
(2, 2, 'BBB-463', 844142),
(3, 3, 'CCC-532', 1931795),
(4, 4, 'DDD-138', 1458681),
(5, 5, 'EEE-853', 186690),
(6, 6, 'FFF-963', 222941),
(7, 7, 'GGG-692', 604725),
(8, 8, 'NYU-463', 1842367),
(9, 9, 'KWI-654', 258202),
(10, 10, 'ELF-251', 1705778),
(11, 11, 'BAR-442', 246583),
(12, 12, 'ECI-419', 270185),
(13, 13, 'GIK-453', 1968010),
(14, 14, 'NAG-940', 1546934),
(15, 15, 'SZU-511', 485411),
(16, 16, 'FAW-365', 827920),
(17, 17, 'APU-627', 1829501);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `clock`
--

CREATE TABLE `clock` (
  `ID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `startKM` int(11) NOT NULL,
  `endKM` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `clock`
--

INSERT INTO `clock` (`ID`, `studentID`, `startKM`, `endKM`, `start`, `end`) VALUES
(27, 2, 0, 0, '2022-04-06 08:04:00', '2022-04-06 09:04:00'),
(28, 2, 0, 0, '2022-04-07 09:04:00', '2022-04-07 09:04:00'),
(187, 1, 0, 0, '2022-04-04 11:00:00', '2022-04-04 12:00:00'),
(188, 1, 0, 0, '2022-04-05 11:00:00', '2022-04-05 12:00:00'),
(189, 1, 0, 0, '2022-04-06 10:00:00', '2022-04-06 11:00:00'),
(191, 34, 0, 0, '2022-04-04 10:00:00', '2022-04-04 11:00:00'),
(192, 34, 0, 0, '2022-04-06 09:00:00', '2022-04-06 10:00:00'),
(199, 34, 0, 0, '2022-04-09 12:00:00', '2022-04-09 13:00:00'),
(200, 34, 0, 0, '2022-04-10 11:00:00', '2022-04-10 12:00:00'),
(203, 34, 0, 0, '2022-04-05 08:00:00', '2022-04-05 09:00:00'),
(205, 1, 0, 0, '2022-04-09 10:00:00', '2022-04-09 11:00:00'),
(209, 1, 0, 0, '2022-04-07 09:00:00', '2022-04-07 10:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `school`
--

CREATE TABLE `school` (
  `ID` int(11) NOT NULL,
  `schoolName` text COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `school`
--

INSERT INTO `school` (`ID`, `schoolName`) VALUES
(1, 'Teszt school'),
(2, 'schoolName'),
(3, 'btambling2'),
(4, 'beggleson3'),
(5, 'aromushkin4'),
(6, 'gvince5'),
(7, 'bpiotrowski6'),
(8, 'kemmott7'),
(9, 'bwozencraft8'),
(10, 'eflipek9');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `userName` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `phoneNum` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `permission` tinyint(4) NOT NULL,
  `teacherID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `student`
--

INSERT INTO `student` (`ID`, `userName`, `password`, `phoneNum`, `email`, `status`, `permission`, `teacherID`) VALUES
(1, 'teszt1diak', 'cdfac85df641c02fd0e491df0a97ea456fe4e945', '0632222224', 'teszt1diak@teszt.hu', 1, 1, 1),
(2, 'teszt2-2', 'cdfac85df641c02fd0e491df0a97ea456fe4e945', '649 979 8683', 'teszt2-2@teszt.hu', 1, 1, 2),
(3, 'mcopcutt2', 'pbSDfw4Hfq', '282 630 0568', 'prown2@sphinn.com', 1, 1, 9),
(4, 'apembery3', 'O11rc6o4DTkZ', '563 271 4817', 'atatham3@amazon.co.jp', 1, 1, 8),
(5, 'mbischop4', 'AKmLNUdwfa', '280 573 7980', 'usarjeant4@apple.com', 0, 1, 8),
(6, 'dgrigorushkin5', 'X2e3vHZ7oDD', '470 605 8983', 'tdrakes5@bbc.co.uk', 0, 1, 18),
(7, 'graimbauld6', 'EVscpoU6Kad3', '509 878 4030', 'ssedgemond6@accuweather.com', 1, 1, 2),
(8, 'ryakovitch7', 'g4hIyLTlAL5l', '615 920 4322', 'asomersett7@disqus.com', 0, 1, 13),
(9, 'lpoyle8', '7kPeFc', '396 338 4436', 'ahulk8@wsj.com', 1, 1, 12),
(10, 'kberndtssen9', 'E6f6nNQ', '380 913 2371', 'mjuliano9@spiegel.de', 0, 1, 12),
(11, 'epaullina', 'KCUkTwb7Do1', '486 968 7426', 'gcoughtreya@google.es', 1, 1, 12),
(12, 'gtolleb', '706KzOUr', '668 467 1023', 'mdiruggierob@bloglines.com', 1, 1, 3),
(13, 'dshynnc', 'qoazgn5', '823 673 2531', 'wbarreauc@yellowpages.com', 0, 1, 11),
(14, 'gtejadad', 'GleWQu1xp', '846 890 7002', 'wkeemard@tripod.com', 0, 1, 4),
(15, 'nspraggse', 'HsK07ngs', '523 888 8353', 'llandricke@com.com', 0, 1, 4),
(16, 'mwincerf', 'vFUEcoU', '667 691 4331', 'wabrahamf@eepurl.com', 0, 1, 10),
(17, 'bhartrightg', 'czK37ukxx', '271 219 0941', 'apeetg@imageshack.us', 1, 1, 3),
(18, 'mjennisonh', 'tNTRgS', '726 974 9281', 'mbultitudeh@who.int', 0, 1, 11),
(19, 'mgillespeyi', 'PdUKfuN', '885 688 8879', 'scourtliffi@dagondesign.com', 1, 1, 3),
(20, 'kgoronij', '8V2TV9S', '844 429 4442', 'sradloffj@lulu.com', 0, 1, 11),
(21, 'rpenkethmank', 'Sp0LPo', '645 958 9140', 'nyerrillk@opera.com', 0, 1, 14),
(22, 'trestilll', 'ymtaFx3yD', '128 652 3659', 'cblaxleyl@house.gov', 0, 1, 5),
(23, 'waleksichm', '5br76w', '190 948 7207', 'kshirerm@facebook.com', 1, 1, 10),
(24, 'relesn', '2MS2ui3Cvt', '979 204 0459', 'bschaffeln@marriott.com', 1, 1, 15),
(25, 'mbrammallo', 'aeVklrols', '275 850 4780', 'brosenfarbo@miibeian.gov.cn', 1, 1, 8),
(26, 'clumberp', 'kVf6y1Arkd', '148 691 7517', 'ischoberp@ehow.com', 1, 1, 5),
(27, 'dlemmersq', '3cyabffzfa6', '817 688 2784', 'grawdallq@indiatimes.com', 0, 1, 3),
(28, 'vbaskwellr', 'SsMNdh', '464 998 3147', 'ccouvertr@ehow.com', 1, 1, 7),
(29, 'evarndalls', 'Lg5PHgk', '826 210 2596', 'mkeppins@stumbleupon.com', 1, 1, 16),
(30, 'bcrucittit', 'I2pVXpI1Tt', '800 788 6963', 'hbealt@cbc.ca', 0, 1, 1),
(31, 'cgrinyakinu', 'TN9yDFU', '532 587 3908', 'rguarinu@networkadvertising.org', 1, 1, 8),
(32, 'mdaughertyv', 'jzCjaY', '852 981 9808', 'rallnattv@ask.com', 1, 1, 8),
(33, 'ssomerledw', 'Pec4KPu', '887 416 2497', 'twatshamw@google.it', 1, 1, 12),
(34, 'teszt1-1', 'cdfac85df641c02fd0e491df0a97ea456fe4e945', '702 399 7155', 'teszt1-1@teszt.hu', 1, 1, 1),
(35, 'hpapierzy', 'CGrfrFN64', '866 306 1813', 'ataboury@hatena.ne.jp', 1, 1, 1),
(36, 'lflorentinez', '2TbSk3eu', '537 874 8514', 'fsimakz@nyu.edu', 0, 1, 12),
(37, 'lwigg10', 'Ws4XaN22O', '544 611 2067', 'astalf10@biglobe.ne.jp', 0, 1, 3),
(38, 'cgorrick11', 'nhyLya2ek', '903 932 6501', 'kcrackel11@narod.ru', 0, 1, 15),
(39, 'hbredee12', 'yKNFLaJ9BFZ', '330 187 9442', 'fhendriksen12@redcross.org', 0, 1, 7),
(40, 'bcorstan13', 'rFUykVELya', '642 771 2447', 'vpirrone13@yellowbook.com', 0, 1, 15),
(41, 'cpriscott14', '9nwlLwbBkrG', '720 139 2035', 'jmassimo14@upenn.edu', 1, 1, 2),
(42, 'eturbayne15', 'ibkwhQjPU', '748 471 1313', 'tlancley15@plala.or.jp', 0, 1, 4),
(43, 'sromao16', 'HE5HeaHpHFAW', '535 429 6407', 'madnet16@huffingtonpost.com', 0, 1, 17),
(44, 'sboddam17', 'nmEqArsDQ2', '240 314 2884', 'aconkey17@cloudflare.com', 1, 1, 2),
(45, 'tmccutheon18', 'CUNGAL9', '274 745 2332', 'gyourell18@slideshare.net', 1, 1, 14),
(46, 'mmcmenamin19', 'tkUZ5gutb36O', '554 721 7677', 'mrack19@newsvine.com', 1, 1, 3),
(47, 'ldupree1a', '3r5woaRsxSMB', '269 990 8919', 'bcrat1a@aol.com', 0, 1, 17),
(48, 'cnimmo1b', '1lSddP', '998 759 2728', 'kclaiton1b@canalblog.com', 1, 1, 12),
(49, 'mrenne1c', 'RnXH82', '983 862 7998', 'ssharnock1c@sina.com.cn', 0, 1, 3),
(50, 'tburfield1d', 'FQKR4X23', '308 481 5581', 'jbrushneen1d@elpais.com', 1, 1, 17),
(51, 'ckennham0', 'sOzeHWOqlB', '120 925 7630', 'lmoughtin0@weather.com', 0, 1, 10),
(65, 'asdasdas', '', 'asdasdas', 'asdsd', 1, 1, 2),
(66, 'asdads', '', 'asdasd', 'asdasd', 1, 1, 7),
(67, 'fdsfdsfdsf', '', '1231231231', 'aadsadsads@asasdadsd.hu', 1, 1, 1),
(68, 'BÉLA', '', '21312312', 'BELA@gmail.hu', 1, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teacher`
--

CREATE TABLE `teacher` (
  `ID` int(11) NOT NULL,
  `userName` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `password` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `phoneNum` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `permission` tinyint(4) NOT NULL,
  `schoolID` int(11) NOT NULL,
  `clockStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `teacher`
--

INSERT INTO `teacher` (`ID`, `userName`, `password`, `phoneNum`, `email`, `status`, `permission`, `schoolID`, `clockStatus`) VALUES
(1, 'teszt1tanar', '4b8c890edd1a93d9e4f63fb160d6c223b722f41f', '06301111117', 'teszt1tanar@teszt.hu', 1, 2, 1, 1),
(2, 'Kovacs Jozsi', '4b8c890edd1a93d9e4f63fb160d6c223b722f41f', '06203295616', 'kovacsjozsef@tanar.hu', 1, 2, 1, 1),
(3, 'ohillaby2', 'f4t8Rf1', '628 232 1494', 'vgillet2@harvard.edu', 0, 2, 1, 1),
(4, 'mtiuit3', 'MCxMh6SPGR', '399 261 8373', 'kdaleman3@usgs.gov', 0, 2, 4, 1),
(5, 'dmaulkin4', 'zEWWMw6Y5c0s', '400 615 4552', 'oirlam4@mashable.com', 1, 2, 3, 1),
(6, 'tskitch5', 'aT8dQpEaQc', '506 549 3781', 'bcallum5@dropbox.com', 0, 2, 9, 2),
(7, 'kneller6', 'DSdp0jKNqOY', '315 709 8267', 'ogehrtz6@quantcast.com', 1, 2, 1, 1),
(8, 'pdeble7', 'w0uYNBQ5', '344 491 2450', 'hfoxhall7@amazon.com', 0, 2, 7, 2),
(9, 'jdahill8', '4z2HK2PqG9E', '591 883 7297', 'kjagg8@digg.com', 0, 2, 5, 1),
(10, 'wmadders9', 's3xBWV', '583 527 7087', 'mwilsher9@mtv.com', 1, 2, 9, 1),
(11, 'aheitona', 'gqXlDaBBr', '898 313 1666', 'jwillimenta@exblog.jp', 1, 2, 9, 1),
(12, 'ebrabenderb', 'djCR9To', '543 329 6277', 'dbeddallb@vkontakte.ru', 1, 2, 3, 2),
(13, 'hsnashallc', 'h7nxNCk6', '986 901 5581', 'sogormallyc@aboutads.info', 1, 2, 8, 2),
(14, 'cbremend', 'cqQPNjXWJyH', '723 926 0387', 'bseelbachd@businesswire.com', 1, 2, 5, 2),
(15, 'lludgatee', 'iETtuwaFIHZ', '753 901 5076', 'ntaylore@hibu.com', 0, 2, 10, 1),
(16, 'ianyene0', 'sXWrBm', '910 435 2721', 'semby0@dot.gov', 0, 2, 6, 2),
(17, 'tpriel1', 'W3DoJM8', '346 848 2955', 'ftrudgian1@engadget.com', 1, 2, 3, 2),
(18, 'teszt2tanar', '4b8c890edd1a93d9e4f63fb160d6c223b722f41f', '12312312312', 'teszt2tanar@teszt.hu', 1, 2, 2, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`schoolID`),
  ADD KEY `schoolID` (`schoolID`);

--
-- A tábla indexei `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`teacherID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- A tábla indexei `clock`
--
ALTER TABLE `clock`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`teacherID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- A tábla indexei `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`schoolID`),
  ADD KEY `schoolID` (`schoolID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `car`
--
ALTER TABLE `car`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `clock`
--
ALTER TABLE `clock`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT a táblához `school`
--
ALTER TABLE `school`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT a táblához `teacher`
--
ALTER TABLE `teacher`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`schoolID`) REFERENCES `school` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `AUTO_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`schoolID`) REFERENCES `school` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
