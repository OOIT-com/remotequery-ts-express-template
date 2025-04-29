create table t_code_table
(
    table_name varchar(128) not null,
    name       varchar(256) not null,
    value      text,
    ord        bigint default 1,
    primary key (table_name, name)
)
;
create table t_user_account
(
    user_tid      bigint,
    user_id         varchar(256) not null unique ,
    mobile_number varchar(256) default '',
    pwhash        varchar(256)  default '',
    primary key (user_tid)
)
;
create table t_user_role
(
    user_tid  bigint,
    role_name varchar(256),
    primary key (role_name, user_tid)
)
;

create table t_app_properties
(
    name  varchar(256),
    value varchar(4000) not null,
    primary key (name)
)
;
create table t_label
(
    name        varchar(256)  not null,
    lang        varchar(256)  not null,
    label       varchar(1000) not null,
    description varchar(4000),
    icon        varchar(4000),
    primary key (name, lang)
)
;
