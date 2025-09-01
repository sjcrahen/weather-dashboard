insert into datasource (id, name, source_identifier, type)
    values (nextval('datasource_id_seq'), 'COLUMBIA RIVER BAR', '46029', 'SEAS');

insert into station_datasource (datasource_id, station_id, display_order)
    values (currval('datasource_id_seq'), (select id from station where city = 'Ilwaco'), 6);