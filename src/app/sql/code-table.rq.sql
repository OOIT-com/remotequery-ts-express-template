
--
--
-- SERVICE_ID = CodeTable.selectAll
--

select table_name, name, ord, value, coalesce(label, name) as label, description
from (select ct.table_name, ct.name, ct.ord, ct.value, l.label, l.description
      from t_code_table ct
               left join t_label l on l.name = (ct.table_name || '.' || ct.name) and l.lang = :lang) t

order by table_name, ord, name
;

