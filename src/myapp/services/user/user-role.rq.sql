--
-- SERVICE_ID = UserRole.select
-- ROLES = SYSTEM
--

select role_name
from t_user_role
where user_tid = :userTid
;
