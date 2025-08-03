CREATE TABLE stations
(
    ID        serial primary key,
    SLUG      varchar(50) unique not null,
    NAME      varchar(50) unique not null,
    CITY      varchar(100)       not null,
    STATE     varchar(2)         not null,
    LATITUDE  double precision   not null,
    LONGITUDE double precision   not null,
    TIMEZONE  varchar(50)        not null
);

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('barnegat-light', 'Barnegat Light', 'Barnegat Light', 'NJ', 39.752, -74.090, 'America/New_York');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('bodega-bay', 'Bodega Bay', 'Bodega Bay', 'CA', 38.302, -123.196, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('cape-disappointment', 'Cape Disappointment', 'Ilwaco', 'WA', 46.265, -124.057, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('chetco-river', 'Chetco River', 'Harbor', 'OR', 42.179, -124.542, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('coos-bay', 'Coos Bay', 'Charleston', 'OR', 43.274, -124.564, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('coquille-river', 'Coquille River', 'Bandon', 'OR', 43.274, -124.564, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('depoe-bay', 'Depoe Bay', 'Depoe Bay', 'OR', 44.645, -124.176, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('golden-gate', 'Golden Gate', 'Sausalito', 'CA', 37.795, -122.725, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('grays-harbor', 'Grays Harbor', 'Westport', 'WA', 46.898, -124.161, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('hatteras-inlet', 'Hatteras Inlet', 'Hatteras', 'NC', 35.143, -75.938, 'America/New_York');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('humboldt-bay', 'Humboldt Bay', 'Samoa', 'CA', 40.781, -124.364, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('merrimack-river', 'Merrimack River', 'Newburyport', 'MA', 42.841, -70.863, 'America/New_York');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('morro-bay', 'Morro Bay', 'Morro Bay', 'CA', 35.341, -120.981, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('noyo-river', 'Noyo River', 'Fort Bragg', 'CA', 39.415, -123.994, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('ocracoke-inlet', 'Ocracoke Inlet', 'Ocracoke', 'NC', 35.143, -75.938, 'America/New_York');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('oregon-inlet', 'Oregon Inlet', 'Nags Head', 'NC', 35.767, -75.542, 'America/New_York');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('quillayute-river', 'Quillayute River', 'La Push', 'WA', 47.893, -124.629, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('rogue-river', 'Rogue River', 'Gold Beach', 'OR', 42.179, -124.542, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('siuslaw-river', 'Siuslaw River', 'Florence', 'OR', 43.808, -124.303, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('tillamook-bay', 'Tillamook Bay', 'Garibaldi', 'OR', 45.542, -124.016, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('umpqua-river', 'Umpqua River', 'Winchester Bay', 'OR', 43.808, -124.303, 'America/Los_Angeles');

insert into stations (SLUG, NAME, CITY, STATE, LATITUDE, LONGITUDE, TIMEZONE)
values ('yaquina-bay', 'Yaquina Bay', 'Newport', 'OR', 44.645, -124.176, 'America/Los_Angeles');
