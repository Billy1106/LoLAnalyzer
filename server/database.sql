--CREATE TABLE--

DROP TABLE Items CASCADE;
CREATE TABLE Items(
	name VARCHAR(50), 
    function VARCHAR(100), 
    cost INTEGER,
    PRIMARY KEY (name)
);

DROP TABLE A_Single_Match CASCADE;
CREATE TABLE A_Single_Match(
    Match_id INTEGER, 
    Game_modes VARCHAR(50),
    PRIMARY KEY (match_id)
);

DROP TABLE  AI_controlled_Entities CASCADE;
CREATE TABLE AI_controlled_Entities(
    name VARCHAR(50), 
    Gold_value INTEGER, 
    Spawning_frequency INTEGER,
    PRIMARY KEY (name)
);

DROP TABLE Sponsors CASCADE;
CREATE TABLE Sponsors(
    Company_name VARCHAR(50),
    PRIMARY KEY(Company_name)
);

DROP TABLE Esport_Teams CASCADE;
CREATE TABLE Esport_Teams(
    Team_name VARCHAR(50), 
    World_rank INTEGER,
    PRIMARY KEY(Team_name)
);

DROP TABLE Champion1;
CREATE TABLE Champion1(
    RP_cost INTEGER, 
    BE_cost  INTEGER,
    PRIMARY KEY (RP_cost),
    UNIQUE (BE_cost)
);

DROP TABLE Champion3;
CREATE TABLE Champion3(
    years_since_release INTEGER, 
    RP_cost INTEGER,
    PRIMARY KEY (years_since_release)
);

DROP TABLE Champion5;
CREATE TABLE Champion5(
    years_since_release INTEGER, 
    num_skins INTEGER,
    PRIMARY KEY (years_since_release)
);

DROP TABLE Champion6 CASCADE;
CREATE TABLE Champion6(
	name CHAR(50) NOT NULL,
	years_since_release INTEGER,
	PRIMARY KEY (name)
);

DROP TABLE Abilities_Has;
CREATE TABLE Abilities_Has(
	ability_name CHAR(50),
	champion_name CHAR(50) NOT NULL,
	effect CHAR(500),
	cooldown INTEGER,
	PRIMARY KEY (ability_name),
	FOREIGN KEY (Champion_name)
		REFERENCES Champion6(name)
		    ON DELETE CASCADE
		    ON UPDATE CASCADE
);

DROP TABLE Jungle_Monsters;
CREATE TABLE Jungle_Monsters(
    name VARCHAR(50), 
    buffs VARCHAR(50),
    PRIMARY KEY (name),
    FOREIGN KEY (name)
        REFERENCES AI_controlled_Entities(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Minions;
CREATE TABLE Minions(
    name VARCHAR(50),
    team VARCHAR(50),
    PRIMARY KEY (name),
    FOREIGN KEY (name)
        REFERENCES AI_controlled_Entities(name) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
DROP TABLE Players1 CASCADE;
CREATE TABLE Players1(
    rank VARCHAR(50),
    banner VARCHAR(50),
    PRIMARY KEY (rank),
    UNIQUE(banner)
);

DROP TABLE Players3 CASCADE;
CREATE TABLE Players3(
    level INTEGER,
    total_played_hours INTEGER,
    PRIMARY KEY (level),
    UNIQUE(total_played_hours)
);

DROP TABLE Players4 CASCADE;
CREATE TABLE Players4(
    ID VARCHAR(50),
    server VARCHAR(50),
    rank VARCHAR(50) DEFAULT 'Iron',
    level Integer,
    PRIMARY KEY (ID, server)
);

DROP TABLE Streamers CASCADE; 
CREATE TABLE Streamers(
    ID CHAR(50),
    server CHAR(50), 
    stream_schedule CHAR(50),
        PRIMARY KEY (ID, server),
    FOREIGN KEY (ID, server)
        REFERENCES Players4(ID, server)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Pro_Players_belong;
CREATE TABLE Pro_Players_belong(
    ID CHAR(50),
    Server CHAR(50),
    team_name CHAR(50) NOT NULL, 
    position CHAR(50), 
    last_stated_date DATE,
    PRIMARY KEY (ID, server),
    FOREIGN KEY (ID, server)
            REFERENCES Players4(ID, server)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    FOREIGN KEY (team_name)
        REFERENCES Esport_Teams(team_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Sponsors;
CREATE TABLE Sponsors(
    Company_name CHAR(50),
    PRIMARY KEY(Company_name)
);

DROP TABLE Esport_Teams CASCADE;
CREATE TABLE Esport_Teams(
    Team_name CHAR(50), 
    World_rank INTEGER,
    PRIMARY KEY(Team_name)
);





--Relations--

DROP TABLE Buy CASCADE;
CREATE TABLE Buy(
    champion_name CHAR(50), 
    item_name CHAR(50),
    PRIMARY KEY(champion_name,item_name),
    FOREIGN KEY(champion_name)
        REFERENCES Champion6(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(item_name)
        REFERENCES items(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE match_in CASCADE;
CREATE TABLE match_in(
    name CHAR(50), 
    match_id INTEGER,
    PRIMARY KEY(name,match_id),
    FOREIGN KEY(name)
        REFERENCES champion6(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(match_id)
        REFERENCES A_Single_Match(match_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Kills CASCADE;
CREATE TABLE Kills(
    champion_name CHAR(50), 
    AI_controlled_entity_name CHAR(50),
    PRIMARY KEY(champion_name, Ai_controlled_entity_name),
    FOREIGN KEY(champion_name)
        REFERENCES Champion6(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(Ai_controlled_entity_name)
        REFERENCES AI_controlled_entities(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Play CASCADE;
CREATE TABLE Play(
    match_id INTEGER, 
    player_id CHAR(50), 
    server CHAR(50),
    win_or_lose BOOLEAN,
    PRIMARY KEY(match_id,player_id,server),
    FOREIGN KEY(match_id)
        REFERENCES A_Single_Match(match_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(player_id, server)
        REFERENCES Players4(id, server)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Streamer_Sponsors CASCADE;
CREATE TABLE Streamer_Sponsors(
    Company_name CHAR(50), 
    ID CHAR(50),
    Server CHAR(50),
    PRIMARY KEY(company_name,ID, Server),
    FOREIGN KEY(company_name)
        REFERENCES Sponsors(company_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(ID, server)
        REFERENCES Streamers(ID, server)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE Esport_Sponsors CASCADE;
CREATE TABLE Esport_Sponsors(
    Company_name CHAR(50), 
    Team_name CHAR(50),
    PRIMARY KEY(company_name,team_name),
    FOREIGN KEY(company_name)
        REFERENCES Sponsors(Company_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(team_name)
        REFERENCES Esport_teams(team_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

--Insert--

INSERT INTO Items(name, function, cost) VALUES ('Rabadon s Deathcap', '+150 ability power', '3600');
INSERT INTO Items(name, function, cost) VALUES ('Divine Sunderer', '+40 attack damage, +50 ability haste, +300 health', '3300');
INSERT INTO Items(name, function, cost) VALUES ('Goredrinker', '+55 attack damage, +50 ability haste, +300 health, +8% omnivamp',  '3300');
INSERT INTO Items(name, function, cost) VALUES ('Crown of the Shattered Queen', '+70 ability power, +50 ability haste, +250 health, + 600 mana', '2800');
INSERT INTO Items(name, function, cost) VALUES ('Moonstone Renewer', '+40 ability power, +50 ability haste, +500 health, +100% base mana regeneration', '2500');


INSERT INTO Champion1(RP_cost, BE_cost) VALUES('865','7580');
INSERT INTO Champion1(RP_cost, BE_cost) VALUES('875', '7601');
INSERT INTO Champion1(RP_cost, BE_cost) VALUES('895', '7642');
INSERT INTO Champion1(RP_cost, BE_cost) VALUES('885', '7623');
INSERT INTO Champion1(RP_cost, BE_cost) VALUES('805', '7604');


INSERT INTO Champion3(years_since_release, RP_cost) VALUES('11', '865');
INSERT INTO Champion3(years_since_release, RP_cost) VALUES('10', '875');
INSERT INTO Champion3(years_since_release, RP_cost) VALUES('8', '895');
INSERT INTO Champion3(years_since_release, RP_cost) VALUES('9', '885');
INSERT INTO Champion3(years_since_release, RP_cost) VALUES('7', '845');


INSERT INTO Champion5(years_since_release, num_skins) VALUES('11', '11');
INSERT INTO Champion5(years_since_release, num_skins) VALUES('10', '10');
INSERT INTO Champion5(years_since_release, num_skins) VALUES('8', '8');
INSERT INTO Champion5(years_since_release, num_skins) VALUES('9', '9');
INSERT INTO Champion5(years_since_release, num_skins) VALUES('7', '7');


INSERT INTO Champion6(name, years_since_release) VALUES('Ahri', '11');
INSERT INTO Champion6(name, years_since_release) VALUES('Hecarim', '10');
INSERT INTO Champion6(name, years_since_release) VALUES('Vel koz', '8');
INSERT INTO Champion6(name, years_since_release) VALUES('Aatrox', '9');
INSERT INTO Champion6(name, years_since_release) VALUES('Lulu', '10');


INSERT INTO A_Single_Match(match_id, game_modes) VALUES('1', 'Ranked');
INSERT INTO A_Single_Match(match_id, game_modes) VALUES('2', 'Normal');
INSERT INTO A_Single_Match(match_id, game_modes) VALUES('3', 'ARAM');
INSERT INTO A_Single_Match(match_id, game_modes) VALUES('4', 'URF');
INSERT INTO A_Single_Match(match_id, game_modes) VALUES('5', 'One For All');

INSERT INTO Abilities_has(ability_name, champion_name, effect, cooldown) VALUES ('Charm', 'Ahri', 'Ahri blows a kiss that charms the first enemy it hits instantly stopping movement abilities and causing them to walk harmlessly towards her.', '14');
INSERT INTO Abilities_has(ability_name, champion_name, effect, cooldown) VALUES ('Help, Pix!', 'Lulu', 'When casting on an enemy, Lulu sends Pix to the far side of the target enemy for 4 seconds, dealing them magic damage and revealing them for the same duration; when casting on herself or her ally, Lulu sends Pix to the target ally for 6 seconds, granting them a shield for 2.5 seconds.', '8');
INSERT INTO Abilities_has(ability_name, champion_name, effect, cooldown) VALUES ('Devastating Charge', 'Hecarim', 'Hecarim becomes ghosted and gains 25-65%(based on time active) bonus total movement speed for 4 seconds.', '50');
INSERT INTO Abilities_has(ability_name, champion_name, effect, cooldown) VALUES ('Plasma Fission', 'Vel koz', 'Vel koz fires a plasma bolt in the target direction that deals magic damage to the first enemy hit, slowing them by 70% decaying over a few seconds.', '7');
INSERT INTO Abilities_has(ability_name, champion_name, effect, cooldown) VALUES ('World Ender', 'Aatrox', 'Aatrox unleashes his true demonic form, fearing nearby enemy minions and monsters for 3 seconds, during which they are gradually slowed by up to 99% over the duration.', '150');

INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Chemtech Drake', '125', '150');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Ancient Krug', '32', '60');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Mini Krug', '13', '60');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Red Brambleback', '56', '80');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Blue Sentinel', '56', '80');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Super minion', '45', '50');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Melee minions', '25', '40');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Siege minion', '95', '50');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Caster minions', '22', '30');
INSERT INTO AI_controlled_Entities(name, gold_value, spawning_frequency) VALUES ('Ultra minion', '1000', '500');


INSERT INTO Jungle_Monsters(name, buffs) VALUES ('Chemtech Drake', 'Chemtech Soul');
INSERT INTO Jungle_Monsters(name, buffs) VALUES ('Ancient Krug', NULL);
INSERT INTO Jungle_Monsters(name, buffs) VALUES ('Mini Krug', NULL);
INSERT INTO Jungle_Monsters(name, buffs) VALUES ('Red Brambleback', 'Crest of Cinders');
INSERT INTO Jungle_Monsters(name, buffs) VALUES ('Blue Sentinel', 'Crest of Insight');


INSERT INTO Minions(name, team) VALUES ('Super minion', 'blue');
INSERT INTO Minions(name, team) VALUES ('Melee minions', 'blue');
INSERT INTO Minions(name, team) VALUES ('Siege minion', 'red');
INSERT INTO Minions(name, team) VALUES ('Caster minions', 'red');
INSERT INTO Minions(name, team) VALUES ('Ultra minion', 'blue');


INSERT INTO Players1(rank, banner) VALUES('Gold',  'Gold Banner');
INSERT INTO Players1(rank, banner) VALUES('Bronze', 'Bronze Banner');
INSERT INTO Players1(rank, banner) VALUES('Silver', 'Silver Banner');
INSERT INTO Players1(rank, banner) VALUES('Challenger', 'Challenger Banner');
INSERT INTO Players1(rank, banner) VALUES('Diamond', 'Diamond Banner');


INSERT INTO Players3(level, total_played_hours) VALUES('257', '2570');
INSERT INTO Players3(level, total_played_hours) VALUES('1', '10');
INSERT INTO Players3(level, total_played_hours) VALUES('300', '300');
INSERT INTO Players3(level, total_played_hours) VALUES('520', '5100');
INSERT INTO Players3(level, total_played_hours) VALUES('110', '1200');
INSERT INTO Players3(level, total_played_hours) VALUES('1000', '130000');
INSERT INTO Players3(level, total_played_hours) VALUES('5400', '54000');
INSERT INTO Players3(level, total_played_hours) VALUES('5500', '55000');


INSERT INTO Players4(ID, server, rank, level) VALUES('Baba Beeswax', 'NA', 'Gold', '257');
INSERT INTO Players4(ID, server, rank, level) VALUES ('Billy', 'JPN', 'Bronze', '1');
INSERT INTO Players4(ID, server, rank, level) VALUES ('Jeanette', 'CN', 'Gold', '300');
INSERT INTO Players4(ID, server, rank, level) VALUES ('Kohei', 'JPN', 'Silver', '500');
INSERT INTO Players4(ID, server, rank, level) VALUES ('Yuh', 'NA', 'Silver', '100');
INSERT INTO Players4(ID, server, rank, level) VALUES ('Hide on Bush', 'KR', 'Challenger', '10000');
INSERT INTO Players4(ID, server, rank, level) VALUES ('ppgod', 'CN', 'Challenger', '5000');
INSERT INTO Players4(ID, server, rank, level) VALUES ('llman', 'NA', 'Diamond', '5000');
INSERT INTO Players4(ID, server, rank, level) VALUES('Xiaohu', 'CN', 'Challenger', '30000');
INSERT INTO Players4(ID, server, rank, level) VALUES('Ming', 'CN', 'Challenger', '25000');




INSERT INTO Streamers(ID, server, Stream_schedule) VALUES ('Billy', 'JPN','Every Friday 7:00 pm to 10:00 pm');
INSERT INTO Streamers(ID, server, Stream_schedule) VALUES ('Jeanette', 'CN', 'Every Saturday 10:00 pm to 12:00 pm'); 
INSERT INTO Streamers(ID, server, Stream_schedule) VALUES ('Baba Beeswax', 'NA', 'Every Sunday 1:00 am to 10:00 pm'); 
INSERT INTO Streamers(ID, server, Stream_schedule) VALUES ('Kohei', 'JPN', 'Every day 3:00 am to 11:00pm');
INSERT INTO Streamers(ID, server, Stream_schedule) VALUES ('Yuh', 'NA', 'Every Monday 3:00 am to 11:00pm');


INSERT INTO Pro_Players_belong(ID, server, team_name, position, last_stated_date) VALUES ('Hide on Bush', 'KR', 'T1', 'Mid',  '02/01/5013');
INSERT INTO Pro_Players_belong(ID, server, team_name, position, last_stated_date) VALUES ('ppgod', 'CN', 'Victory Five', 'Support',  '12/01/5021');
INSERT INTO Pro_Players_belong(ID, server, team_name, position, last_stated_date) VALUES ('Baba Beeswax', 'NA', 'Evil Geniuses', 'Mid',  '07/25/5022');
INSERT INTO Pro_Players_belong(ID, server, team_name, position, last_stated_date) VALUES ('llman', 'NA', 'Cloud9', 'Mid',  '01/13/5022');
INSERT INTO Pro_Players_belong(ID, server, team_name, position, last_stated_date) VALUES ('Billy', 'JPN', 'DetonatioN FocusMe', 'ADC',  '06/27/5022');
INSERT INTO Pro_Players-belong(ID, server, team_name, position, last_stated_date) VALUES ('Xiaohu', 'CN', 'Royal Never Give Up', 'Mid', '01/05/2015');
INSERT INTO Pro_Players-belong(ID, server, team_name, position, last_stated_date) VALUES ('Ming', 'CN', 'Royal Never Give Up', 'Support', '12/12/2016');



INSERT INTO Sponsors(Company_name) VALUES ('Mastercard');
INSERT INTO Sponsors(Company_name) VALUES ('Secretlab');
INSERT INTO Sponsors(Company_name) VALUES ('Amazon');
INSERT INTO Sponsors(Company_name) VALUES ('OPPO');
INSERT INTO Sponsors(Company_name) VALUES ('Red Bull');
INSERT INTO Sponsors(Company_name) VALUES ('Louis Vuitton');


INSERT INTO Esport_Teams(Team_name, World_rank) VALUES ('T1', '2');
INSERT INTO Esport_Teams(Team_name, World_rank) VALUES ('Victory Five', '1');
INSERT INTO Esport_Teams(Team_name, World_rank)VALUES ('Evil Geniuses', '3');
INSERT INTO Esport_Teams(Team_name, World_rank) VALUES ('Cloud9', '4');
INSERT INTO Esport_Teams(Team_name, World_rank) VALUES ('DetonatioN FocusMe', '5');


INSERT INTO Buy(Champion_name,  item_name) VALUES ('Ahri', 'Rabadon s Deathcap');
INSERT INTO Buy(Champion_name,  item_name) VALUES ('Hecarim', 'Divine Sunderer');
INSERT INTO Buy(Champion_name,  item_name) VALUES ('Vel koz', 'Crown of the Shattered Queen');
INSERT INTO Buy(Champion_name,  item_name) VALUES ('Aatrox', 'Goredrinker');
INSERT INTO Buy(Champion_name,  item_name) VALUES ('Lulu', 'Moonstone Renewer');


INSERT INTO match_in(name, match_id) VALUES ('Ahri', '1');
INSERT INTO match_in(name, match_id) VALUES ('Hecarim', '2');
INSERT INTO match_in(name, match_id) VALUES ('Vel koz', '3');
INSERT INTO match_in(name, match_id) VALUES ('Aatrox', '4');
INSERT INTO match_in(name, match_id) VALUES ('Lulu', '5');


INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Ahri', 'Chemtech Drake');
INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Ahri', 'Ancient Krug');
INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Hecarim', 'Ancient Krug');
INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Hecarim', 'Mini Krug');
-- INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Lulu', 'Mini Krug');violate fk
INSERT INTO Kills(champion_name, AI_controlled_entity_name) VALUES ('Lulu', 'Ancient Krug');


INSERT INTO Play(match_id, player_id, server, win_or_lose) VALUES ('1', 'Billy ', 'JPN', 'TRUE');
INSERT INTO Play(match_id, player_id, server,win_or_lose) VALUES ('2', 'Jeanette', 'CN', 'FALSE');
INSERT INTO Play(match_id, player_id, server, win_or_lose) VALUES ('3', 'Kohei', 'JPN', 'FALSE');
INSERT INTO Play(match_id, player_id, server, win_or_lose) VALUES ('4', 'Baba Beeswax', 'NA', 'TRUE');
INSERT INTO Play(match_id, player_id, server, win_or_lose) VALUES ('5', 'Yuh', 'NA', 'TRUE');


INSERT INTO Streamer_Sponsors(company_name, ID, server) VALUES ('Mastercard', 'Billy', 'JPN');
INSERT INTO Streamer_Sponsors(company_name, ID, server) VALUES ('Louis Vuitton', 'Baba Beeswax', 'NA');
INSERT INTO Streamer_Sponsors(company_name, ID, server) VALUES ('OPPO', 'Jeanette', 'CN');
INSERT INTO Streamer_Sponsors(company_name, ID, server) VALUES ('Red Bull', 'Kohei', 'JPN');
INSERT INTO Streamer_Sponsors(company_name, ID, server) VALUES ('Secretlab', 'Yuh', 'NA');


INSERT INTO Esport_Sponsors(company_name, team_name) VALUES ('Mastercard', 'T1');
INSERT INTO Esport_Sponsors(company_name, team_name) VALUES ('Louis Vuitton', 'Victory Five');
INSERT INTO Esport_Sponsors(company_name, team_name) VALUES ('Secretlab', 'Evil Geniuses');
INSERT INTO Esport_Sponsors(company_name, team_name) VALUES ('OPPO', 'Cloud9');
INSERT INTO Esport_Sponsors(company_name, team_name) VALUES ('Red Bull', 'DetonatioN FocusMe');


