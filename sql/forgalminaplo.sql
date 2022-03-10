-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 10. 13:23
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
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '06301111111', 'admin@admin.hu', 1, 3, 1);

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `clock`
--

CREATE TABLE `clock` (
  `ID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `startKM` int(11) NOT NULL,
  `endKM` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

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
(1, 'Teszt school');

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
(1, 'teszt1diak', 'cdfac85df641c02fd0e491df0a97ea456fe4e945', '0632222222', 'teszt1diak@teszt.hu', 1, 1, 1);

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
(1, 'teszt1tanar', '4b8c890edd1a93d9e4f63fb160d6c223b722f41f', '06301111117', 'teszt1tanar@teszt.hu', 1, 2, 1, 1);

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
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`studentID`),
  ADD KEY `studentID` (`studentID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `car`
--
ALTER TABLE `car`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `clock`
--
ALTER TABLE `clock`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `school`
--
ALTER TABLE `school`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `teacher`
--
ALTER TABLE `teacher`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Megkötések a táblához `clock`
--
ALTER TABLE `clock`
  ADD CONSTRAINT `clock_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
