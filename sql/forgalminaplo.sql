-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 07. 13:46
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
  `felhNev` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telSzam` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `jog` tinyint(4) NOT NULL,
  `iskolaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`ID`, `felhNev`, `jelszo`, `telSzam`, `email`, `status`, `jog`, `iskolaID`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', '06301111111', 'admin@admin.hu', 1, 3, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auto`
--

CREATE TABLE `auto` (
  `ID` int(11) NOT NULL,
  `tanarID` int(30) NOT NULL,
  `rendszam` varchar(10) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `osszKM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak`
--

CREATE TABLE `diak` (
  `ID` int(11) NOT NULL,
  `felhNev` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telSzam` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `jog` tinyint(4) NOT NULL,
  `tanarID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola`
--

CREATE TABLE `iskola` (
  `ID` int(11) NOT NULL,
  `iskolaNev` text COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskola`
--

INSERT INTO `iskola` (`ID`, `iskolaNev`) VALUES
(1, 'Teszt Iskola');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ora`
--

CREATE TABLE `ora` (
  `ID` int(11) NOT NULL,
  `diakID` int(11) NOT NULL,
  `kezdoKM` int(11) NOT NULL,
  `vegsoKM` int(11) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanar`
--

CREATE TABLE `tanar` (
  `ID` int(11) NOT NULL,
  `felhNev` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jelszo` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telSzam` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `status` tinyint(4) NOT NULL,
  `jog` tinyint(4) NOT NULL,
  `iskolaID` int(11) NOT NULL,
  `orastatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`iskolaID`),
  ADD KEY `iskolaID` (`iskolaID`);

--
-- A tábla indexei `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`tanarID`),
  ADD KEY `tanarID` (`tanarID`);

--
-- A tábla indexei `diak`
--
ALTER TABLE `diak`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`tanarID`),
  ADD KEY `tanarID` (`tanarID`);

--
-- A tábla indexei `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `ora`
--
ALTER TABLE `ora`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`diakID`),
  ADD KEY `diakID` (`diakID`);

--
-- A tábla indexei `tanar`
--
ALTER TABLE `tanar`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID` (`ID`,`iskolaID`),
  ADD KEY `iskolaID` (`iskolaID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `auto`
--
ALTER TABLE `auto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `diak`
--
ALTER TABLE `diak`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `iskola`
--
ALTER TABLE `iskola`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `ora`
--
ALTER TABLE `ora`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tanar`
--
ALTER TABLE `tanar`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`iskolaID`) REFERENCES `iskola` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_ibfk_1` FOREIGN KEY (`tanarID`) REFERENCES `tanar` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `diak`
--
ALTER TABLE `diak`
  ADD CONSTRAINT `diak_ibfk_2` FOREIGN KEY (`tanarID`) REFERENCES `tanar` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `ora`
--
ALTER TABLE `ora`
  ADD CONSTRAINT `ora_ibfk_1` FOREIGN KEY (`diakID`) REFERENCES `diak` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `tanar`
--
ALTER TABLE `tanar`
  ADD CONSTRAINT `tanar_ibfk_1` FOREIGN KEY (`iskolaID`) REFERENCES `iskola` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
