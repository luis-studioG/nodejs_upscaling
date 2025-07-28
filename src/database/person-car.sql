
create table person (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(7) NOT NULL,
    email VARCHAR(150) NOT NULL,
    date_of_birth DATE NOT NULL,
    country_of_birth VARCHAR(50) NOT NULL,
    car_id BIGINT REFERENCES car (id),
    UNIQUE(car_id)
);

create table car (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    price NUMERIC(19, 2) NOT NULL
);

insert into person (first_name, last_name, gender, email, date_of_birth, country_of_birth) values ('John', 'Doe', 'Male', 'john.doe@example.com', '1990-01-01', 'USA');
insert into person (first_name, last_name, gender, email, date_of_birth, country_of_birth) values ('Anne', 'Doe', 'Female', 'jane.doe@example.com', '1990-01-01', 'USA');
insert into person (first_name, last_name, gender, email, date_of_birth, country_of_birth) values ('Jim', 'Beam', 'Male', 'jim.beam@example.com', '1990-01-01', 'USA');


insert into car (make, model, price) values ('Toyota', 'Corolla', 20000);
insert into car (make, model, price) values ('Ford', 'Mustang', 30000);
insert into car (make, model, price) values ('Chevrolet', 'Camaro', 40000);
insert into car (make, model, price) values ('Nissan', 'GT-R', 50000);