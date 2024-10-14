create database exam_sys;

use exam_sys;


create table student(
	student_id int auto_increment primary key,
    student_name varchar(50),
    phone varchar(10) unique
);

create table result(
	result_id int auto_increment primary key,
    student_id int,
    score int ,
    date_taken date,
    foreign key (student_id) references student(student_id)
);


insert into student values(2,'bhushan','9421444629');
insert into student values(1,'sarthak','545864513');
insert into student values(3, 'jayesh', '123456789');
insert into student values(4, 'prerana','111111111');

SELECT * FROM STUDENT;


insert into result (result_id, student_id,score, date_taken) values(3,3, 90,'2024-2-23');
select * from result; 
