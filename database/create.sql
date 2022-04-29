drop database if exists surveysDB
create database surveysDB
GO

use surveysDB
GO

drop table if exists surveys
create table surveys(
survey_id int not null PRIMARY KEY identity(1,1), 
name varchar(50) not null,
description varchar(100) not null,

)
GO

drop table if exists users
create table users(
user_id int not null PRIMARY KEY identity(1,1),
name varchar(100)
)
GO

drop table if exists fields
create table fields(
field_id int not null PRIMARY KEY identity(1,1),
survey_id int not null,
FOREIGN KEY (survey_id) REFERENCES surveys(survey_id)
ON DELETE CASCADE
ON UPDATE CASCADE

)
GO
drop table if exists answers
create table answers(
answer_id int not null PRIMARY KEY identity(1,1),
answer varchar(max),
field_id int not null,
user_id int not null
FOREIGN KEY (field_id) REFERENCES fields(field_id)
ON DELETE CASCADE
ON UPDATE CASCADE
,
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE
ON UPDATE CASCADE
)

