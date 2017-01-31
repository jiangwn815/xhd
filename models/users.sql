create table users(
id varchar(64) not null,
createdAt BIGINT not null,
updatedAt BIGINT not null,
version BIGINT not null,
nickname varchar(128),
sex int,
wxlanguage varchar(8),
city varchar(64),
province varchar(64),
country varchar(64),
openid varchar(128),
unionid varchar(128),
groupid int,
subscribe_time BIGINT,
subscribe int,
headimgurl varchar(256),
remark varchar(128),
email varchar(128),
mobile varchar(32) not null,
passwd varchar(128) not null,
primary key(id)
);