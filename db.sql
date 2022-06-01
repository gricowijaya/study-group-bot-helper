drop database if exists bot_database;

create database bot_database; 

use bot_database;

create table anggota (
  id int primary key auto_increment, 
  nama varchar(30),
  status int,
  phone varchar(15)
);

create table progress (
  id int primary key auto_increment,
  id_anggota int,
  progress varchar(250),
  foreign key (id_anggota) references anggota(id)
);

create table absen (
  id int primary key auto_increment,
  id_anggota int, 
  clock_in datetime,
  clock_out datetime
);
