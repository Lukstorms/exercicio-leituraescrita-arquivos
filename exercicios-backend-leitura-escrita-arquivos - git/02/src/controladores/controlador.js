const { listarPokemons, detalharPokemon } = require('utils-playground')

const listar = async (req, res) => {
    try {
        const listagem = await listarPokemons()
        return res.status(200).json(listagem)
    } catch (error) {
        return res.status(500).json("Erro do servidor")
    }
}

const detalhar = async (req, res) => {
    try {
        const { idOuNome } = req.params

        const { id, name, height, weight, base_experience, forms, abilities, species } = await detalharPokemon(idOuNome)
        const pokemonDetalhado = {
            id,
            name,
            height,
            weight,
            base_experience,
            forms,
            abilities,
            species
        }


        return res.status(200).json(pokemonDetalhado)
    } catch (error) {
        return res.status(500).json("Erro do servidor")
    }

}


module.exports = {
    listar,
    detalhar
}