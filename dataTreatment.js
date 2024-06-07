import dfd from 'danfojs'
import * as db from './db.js'
import pg from 'pg'
const { Client } = pg


export function TratarDadosDb(){
const Clien = new Client({

    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: "3326103j",
    database: 'postgres'


})

    Clien.connect();


    var df = Clien.query("SELECT json_array_elements(data->'transacoes')-> 'cpmf' AS Cpmf, json_array_elements(data->'transacoes')-> 'dataEntrada' AS DataEntrada, json_array_elements(data->'transacoes')-> 'tipoTransacao' AS TipoTransacao, json_array_elements(data->'transacoes') -> 'tipoOperacao' AS TipoOperacao, json_array_elements(data->'transacoes')-> 'valor' AS Valor, json_array_elements(data->'transacoes')-> 'titulo' AS Titulo, json_array_elements(data->'transacoes')-> 'descricao' AS Descricao FROM main_table WHERE id = (SELECT MAX(id) FROM main_table)").then(function(data){
        var MyJSON = data.rows;

        console.log(MyJSON);

        var df = new dfd.DataFrame(MyJSON);

        df.print();

        df.drop({ columns: ["cpmf"], inplace: true })

        df.print();

        df.replace('loja1', 'Casas Bahia', { columns: ["titulo"], inplace: true } )

        df.print();

        df.replace('loja2', 'Havan', { columns: ["titulo"], inplace: true } )

        df.print();

        df.replace('loja3', 'Daju', { columns: ["titulo"], inplace: true } )

        df.print();

        df.replace('loja4', 'Cobasi', { columns: ["titulo"], inplace: true } )

        df.print();

        df.asType("valor", "float32")

        df.print();

        var indices = df['tipooperacao']
            .values
            .map((name, index) => name === "crédito" ? index : -1)
            .filter(index => index !== -1);
      
      // Remover a linha com o índice encontrado
        df = df.drop({ index: indices, axis: 0 });

        df.print();

        df.sortValues("valor", { ascending: false, inplace: true })

        df.print();

        df.drop({ columns: ["dataentrada", "tipotransacao","titulo"], inplace: true })

        df.print();

        df.drop({ columns: ["tipooperacao"], inplace: true })

        df.print();

        var teste = df.groupby(["descricao"]).col(["valor"]).sum();

        teste.print();

        teste["valor_sum"] = teste["valor_sum"].round(2);

        //df.groupby(["descricao"]).

        teste.print();

        //console.log(df)

        Clien.end();
        


    });



}

TratarDadosDb()