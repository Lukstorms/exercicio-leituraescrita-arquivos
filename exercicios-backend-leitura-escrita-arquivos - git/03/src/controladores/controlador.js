const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');


const localizar = async (req, res) => {
    const { cep } = req.params

    try {


        const parseER = JSON.parse(await fs.readFile('./src/enderecos.json'));

        const jaTem = parseER.find((endereco) => {
            return endereco.cep === cep

        });


        if (jaTem) {

            const endereco = {
                cep,
                logradouro: jaTem.logradouro,
                complemento: jaTem.complemento,
                bairro: jaTem.bairro,
                localidade: jaTem.localidade,
                uf: jaTem.uf,
                ibge: jaTem.ibge,
                gia: jaTem.gia,
                ddd: jaTem.ddd,
                siafi: jaTem.siafi
            }
            return res.status(200).json(endereco)
        }

        if (!jaTem) {
            const adicionarEndereco = await buscarEndereco(cep)

            const endereco = {
                cep,
                logradouro: adicionarEndereco.logradouro,
                complemento: adicionarEndereco.complemento,
                bairro: adicionarEndereco.bairro,
                localidade: adicionarEndereco.localidade,
                uf: adicionarEndereco.localidade,
                ibge: adicionarEndereco.ibge,
                gia: adicionarEndereco.gia,
                ddd: adicionarEndereco.ddd,
                siafi: adicionarEndereco.siafi
            }


            parseER.push(endereco)
            await fs.writeFile('./src/enderecos.json', JSON.stringify(parseER))
            return res.status(200).json(endereco)
        }



    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = localizar