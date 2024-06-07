import axios from 'axios'

export function APIBanco(){

    return axios.get("https://rickandmortyapi.com/api/episode")
}

var dados = APIBanco();

dados.then(function(resposta){

console.log(resposta.data)

})


// axios.