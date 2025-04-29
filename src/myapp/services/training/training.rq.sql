--
-- SERVICE_ID = Training.insert
--

insert into t_training (training_tid,
                        user_tid,
                        start_time,
                        duration,
                        name, level)
values (nextval('global_tid'),
        :USERTID, :startTime, :duration, :name, :level)
;

--
-- SERVICE_ID = Training.select
--
select *
from t_training
where user_tid = :USERTID
;

--
-- SERVICE_ID = Training.update
--

update t_training
set start_time =:startTime,
    duration =:duration,
    name  =:name,
    level=:level
where user_tid = :USERTID
  and training_tid = :trainingTid
;



--
-- SERVICE_ID = Training.delete
--

delete from t_training
where user_tid = :USERTID
  and training_tid = :trainingTid
;
