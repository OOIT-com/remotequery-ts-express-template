create database foobar;

create sequence s_global_tid start with 1000;
;
create table t_person
(
    person_tid bigint,
    first_name varchar(256),
    last_name  varchar(256),
    age        integer,
    primary key (person_tid)
)
;
