create table t_training
(
    training_tid bigint,
    user_tid     bigint not null,
    start_time    bigint       default 0,
    duration     bigint       default 0,
    name         varchar(256) default 'training name',
    level        bigint       default 1,
    primary key (training_tid)
)
;
