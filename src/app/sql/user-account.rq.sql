--
-- SERVICE_ID = UserAccount.check
-- ROLES = SYSTEM
--

select *
from t_user_account
where user_id = :userId
  and pwhash = :pwhash
;

--
-- SERVICE_ID = UserAccount.newPwhash
-- ROLES = SYSTEM
--

update t_user_account
set pwhash = :pwhash
where user_id = :userId;



--
-- SERVICE_ID = UserAccount.changePwhash
-- ROLES = SYSTEM
--

update t_user_account
set pwhash = :newPwhash
where user_id = :userId
  and pwhash = :pwhash;



--
-- SERVICE_ID = UserAccount.authData
-- ROLES = SYSTEM
--

select :sessionId as session_id, a.user_id, r.roles
from t_user_account a
         left join (select user_tid, string_agg(role_name, ',') as roles
                    from t_user_role
                    group by user_tid) r on r.user_tid = a.user_tid

where user_id = :userId;


--
-- SERVICE_ID = UserAccount.insert
--

insert into t_user_account (user_tid, user_id, mobile_number, pwhash)
values (nextval('s_global_tid'),
        lower(:user_id),
        :mobileNumber,
        :pwhash)
;

--
-- SERVICE_ID = UserAccount.select
--

select
from t_user_account
where user_id like '%'
;
