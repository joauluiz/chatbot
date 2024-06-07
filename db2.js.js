import pg from 'pg'
const { Client } = pg

export function InserirDadoDb(json){
const Clien = new Client({

    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: "3326103j",
    database: 'postgres'


})

Clien.connect();

Clien.query("DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'main_table') THEN CREATE TABLE main_table (id SERIAL PRIMARY KEY, data JSON NOT NULL); END IF; END $$;");

let jsonString = json

var quer='INSERT INTO main_table (data) VALUES ($1);'

Clien.query(quer, [jsonString])


}

//InserirDadoDb('json')