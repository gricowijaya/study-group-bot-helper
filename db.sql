create database bot_database; 

use bot_database;

create table anggota (
  id int primary key auto_increment, 
  nama varchar(30),
  status int,
  phone
);

create table progress (
  id int primary key auto_increment,
  id_user int,
  progress varchar(250),
  foreign key (id_user) references anggota(id)
);

create table absen (
  id int primary key auto_increment,
  id_anggota int, 
  clock_in datetime,
  clock_out datetime
);