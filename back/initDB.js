require('dotenv').config();
const bcrypt = require('bcrypt');

const {
  getConnection
} = require('./db');

async function initialDB() {
  const connection = await getConnection();

  await connection.query('DROP TABLE IF EXISTS views');
  await connection.query('DROP TABLE IF EXISTS ratings');
  await connection.query('DROP TABLE IF EXISTS presentations');
  await connection.query('DROP TABLE IF EXISTS users');

  console.log('Tables deleted if exists');

  await connection.query(` create table  users
(
user_id int primary key auto_increment,
firstname varchar(155) not null,
surname varchar(155) not null,
email varchar(155) not null,
birthdate date ,
username varchar(155) unique not null,
user_password varchar (155) not null,
avatar varchar(255),
role enum ('normal','loader','admin') default 'normal' not null,
active boolean default false not null,
date_account_creation datetime not null,
date_last_update datetime  default  NOW() on update NOW(),
date_password_modification datetime ,
registrationcode varchar (200)
);`);

  await connection.query(`create table  presentations
(
presentation_id int primary key auto_increment,
title varchar (155) not null,
presentation_date date,
presentation_event varchar(155),
city varchar(155),
category varchar (155) ,
presentation_language varchar(55),
date_louded_presentation datetime ,
date_modification_presentation datetime ,
video varchar(250),
user_id int);`);

  await connection.query(
    `alter table presentations ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) `
  );
  await connection.query(`create table  ratings
( 
id integer primary key auto_increment,
rating decimal (2,1), 
score_interest int unsigned not null, 
score_theme_quality int unsigned not null,
score_design int unsigned not null,
score_comunication int unsigned not null,
date_rating  datetime not null,
comments varchar(2500) );`);
  await connection.query(` alter table ratings ADD user_id_ratings INT NOT NULL;
`);
  await connection.query(` alter table ratings ADD CONSTRAINT fk_user_id_ratings FOREIGN KEY (user_id_ratings) REFERENCES users(user_id) ;
`);
  await connection.query(` alter table ratings ADD  presentation_id_ratings INT NOT NULL;
`);
  await connection.query(` alter table ratings ADD CONSTRAINT fk_presentation_id_ratings FOREIGN KEY (presentation_id_ratings) REFERENCES presentations(presentation_id) ;
`);

  await connection.query(`create table  views
(
date_lastview datetime ,

total_views int default 0 );`);

  await connection.query(` alter table views ADD  presentation_id_views INT NOT NULL;
`);
  await connection.query(` alter table views ADD CONSTRAINT fk_presentation_id_views FOREIGN KEY (presentation_id_views) REFERENCES presentations(presentation_id) ;
`);

  // Create initial admin_user
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
        INSERT INTO users(user_id,firstname,surname,email,birthdate,username, user_password,date_account_creation,role, active)
        VALUES(1,"Raul", "Gomez", "83raugomez@gmail.com","1983-12-30","raulHAB", "${password}",NOW(), "admin",true)
      `);
  console.log('Tables created');
  connection.release();
  process.exit();
}

initialDB();