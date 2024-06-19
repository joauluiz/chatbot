import dfd from 'danfojs'
import pg from 'pg'
const { Client } = pg

export function TratarDadosDb(){
    const Clien = new Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: "3326103j",
        database: 'postgres'
    });

    return new Promise((resolve, reject) => {
        Clien.connect();
        
        Clien.query("SELECT json_array_elements(data->'transacoes')-> 'cpmf' AS Cpmf, json_array_elements(data->'transacoes')-> 'dataEntrada' AS DataEntrada, json_array_elements(data->'transacoes')-> 'tipoTransacao' AS TipoTransacao, json_array_elements(data->'transacoes') -> 'tipoOperacao' AS TipoOperacao, json_array_elements(data->'transacoes')-> 'valor' AS Valor, json_array_elements(data->'transacoes')-> 'titulo' AS Titulo, json_array_elements(data->'transacoes')-> 'descricao' AS Descricao FROM main_table WHERE id = (SELECT MAX(id) FROM main_table)").then(function(data){
            var MyJSON = data.rows;
            var df = new dfd.DataFrame(MyJSON);
            df.drop({ columns: ["cpmf"], inplace: true });
            df.replace('loja1', 'Casas Bahia', { columns: ["titulo"], inplace: true });
            df.replace('loja2', 'Havan', { columns: ["titulo"], inplace: true });
            df.replace('loja3', 'Daju', { columns: ["titulo"], inplace: true });
            df.replace('loja4', 'Cobasi', { columns: ["titulo"], inplace: true });
            df.asType("valor", "float32");
            var indices = df['tipooperacao']
                .values
                .map((name, index) => name === "crédito" ? index : -1)
                .filter(index => index !== -1);
            df = df.drop({ index: indices, axis: 0 });
            df.drop({ columns: ["dataentrada", "tipotransacao","titulo"], inplace: true });
            df.drop({ columns: ["tipooperacao"], inplace: true });
            var dfGrouped = df.groupby(["descricao"]).col(["valor"]).sum();
            dfGrouped.sortValues("valor_sum", { ascending: false, inplace: true });
            dfGrouped["valor_sum"] = dfGrouped["valor_sum"].round(2);
            //dfGrouped.print();
            Clien.end();
            resolve(dfGrouped); // Resolvendo a Promise com o valor desejado
        }).catch(error => {
            // Em caso de erro, rejeitamos a Promise com o erro
            reject(error);
        });
    });
}


export function dataframeToString(df) {
    let result = "";

    // Obtendo as linhas do DataFrame
    const rows = df.values;
  
    // Iterando sobre as linhas do DataFrame
    for (let i = 0; i < rows.length; i++) {
      // Iterando sobre os valores de cada linha
      for (let j = 0; j < rows[i].length; j++) {
        // Verificando se o valor é numérico
        const value = rows[i][j];
        const formattedValue = typeof value === 'number' ? `R$ ${value.toFixed(2).replace('.', ',')}` : value;
        // Se não for o primeiro valor da linha, adiciona uma vírgula antes do próximo valor
        if (j !== 0) {
          result += ": ";
        }
        result += formattedValue;
      }
      result += "\n";
    }
  
    return result;
  }