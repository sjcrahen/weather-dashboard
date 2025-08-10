update datasource
set name = (select trim(substring(name from '^\d+\s*-\s*(.*)$')))
where name like '% - %';
