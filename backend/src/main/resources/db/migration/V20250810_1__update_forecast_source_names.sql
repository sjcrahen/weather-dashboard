alter table datasource
    alter column name type varchar(255);

update datasource
set name = 'Sandy Hook NJ to Fenwick Island DE to 20 NM offshore and Delaware Bay'
where source_identifier = 'FZUS51.KPHI';

update datasource
set name = 'Central California Coast from Point Arena to Point Piedras Blancas out to 60 NM, including Monterey Bay, Greater Farallones, and Cordell Bank National Marine Sanctuaries'
where source_identifier = 'FZUS56.KMTR';

update datasource
set name = 'Coastal waters from Cape Shoalwater Washington to Florence Oregon and westward 60 NM'
where source_identifier = 'FZUS56.KPQR';

update datasource
set name = 'Coastal waters from Florence Oregon to Point St. George California and westward 60 NM'
where source_identifier = 'FZUS56.KMFR';

update datasource
set name = 'Inland waters of western Washington and the northern and central Washington coastal waters including the Olympic Coast National Marine Sanctuary'
where source_identifier = 'FZUS56.KSEW';

update datasource
set name = 'From S of Currituck Beach Light to N of Surf City NC out 20 NM, including the Albemarle and Pamlico Sounds and the Monitor National Marine Sanctuary'
where source_identifier = 'FZUS52.KMHX';

update datasource
set name = 'Waters from Point St George to Pt Arena and out 60 NM'
where source_identifier = 'FZUS56.KEKA';

update datasource
set name = 'Coastal waters from the Merrimack River MA to Watch Hill RI out to 25 NM'
where source_identifier = 'FZUS51.KBOX';

update datasource
set name = 'Point Piedras Blancas to San Mateo Point CA out 60 NM including the Channel Islands National Marine Sanctuary'
where source_identifier = 'FZUS56.KLOX';
