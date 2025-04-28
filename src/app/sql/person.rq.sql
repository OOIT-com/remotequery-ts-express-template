--
-- SERVICE_ID = person.insert
--

insert into t_person (person_tid,
                      first_name,
                      last_name,
                      age)
values (nextval('s_global_tid'),
        :firstName,
        :lastName,
        :age)

;

--
-- SERVICE_ID = person.select
--

select *
from t_person

;
