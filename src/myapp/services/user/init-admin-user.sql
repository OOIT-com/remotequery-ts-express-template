insert into t_user_account (user_tid, user_id)
select 1000, 'toni.buenter@gmail.com'
where not exists (select 1
                  from t_user_account
                  where user_tid = 1000);


insert into t_user_role (user_tid, role_name)
select 1000, 'USER'
where not exists (select 1
                  from t_user_role
                  where user_tid = 1000 and role_name = 'USER');




insert into t_user_role (user_tid, role_name)
select 1000, 'ADMIN'
where not exists (select 1
                  from t_user_role
                  where user_tid = 1000 and role_name = 'ADMIN');
