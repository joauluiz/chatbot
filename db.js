import pg from 'pg'
const { Client } = pg

export async function InserirDadoDb(json) {
    const client = new Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: '3326103j',
        database: 'postgres'
    });

    try {
        await client.connect();

        // Verifica e cria a tabela se ela não existir
        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'main_table') THEN
                    CREATE TABLE main_table (
                        id SERIAL PRIMARY KEY,
                        data JSON NOT NULL
                    );
                END IF;
            END $$;
        `);

        const jsonString = json;
        const query = 'INSERT INTO main_table (data) VALUES ($1);';

        await client.query(query, [jsonString]);
    } catch (error) {
        console.error('Erro ao inserir dados no banco:', error);
        throw error;
    } finally {
        await client.end();
    }
}
