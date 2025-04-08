insert into t_person
select 4,
       'Hans',
       'Müller',
       34
from t_person
where 4 not in (select person_tid from t_person)
