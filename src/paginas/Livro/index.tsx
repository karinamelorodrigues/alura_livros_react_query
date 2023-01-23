import { useQuery } from '@tanstack/react-query'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes } from 'ds-alurabooks'
import { AbInputQuantidade } from 'ds-alurabooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { obterLivro } from '../../http'
import { formatador } from '../../utils/formatador-moeda'
import Loader from '../../componentes/Loader'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import SobreAutor from '../../componentes/SobreAutor'
import BlocoSobre from '../../componentes/BlocoSobre'
import { ILivro } from '../../interfaces/ILivro'
import { AxiosError } from 'axios'
import './Livro.css'

const Livro = () => {
    const params = useParams()

    const [opcao, setOpcao] = useState<AbGrupoOpcao>()
    
    const { data: livro, isLoading, error} = useQuery<ILivro | null, AxiosError>(['livro', params.slug], () => obterLivro(params.slug || ''))

    if (error) {
        console.log('Erro na requisição')
        console.log(error.message)
        return <h1>Ops! Algum erro inesperado aconteceu :(</h1>
    }

    if (livro === null) {
        return <h1>Livro não encontrado :(</h1>
    }

    if (isLoading || !livro) {
        return <Loader />
    }

    const opcoes: AbGrupoOpcao[] = livro.opcoesCompra ? livro.opcoesCompra.map(opcao => ({
        id: opcao.id,
        corpo: formatador.format(opcao.preco),
        titulo: opcao.titulo,
        rodape: opcao.formatos ? opcao.formatos.join(',') : ''
    }))

    : 
        []

    return (
        <section className='livro-detalhe'>
            <TituloPrincipal texto="Detalhes do livro" />
            <div>
                <div className="container">
                    <figure>
                        <img src={livro.imagemCapa} alt={livro.descricao} />
                    </figure>
                    <div className="detalhes">
                        <h2>{livro.titulo}</h2>
                        <p>{livro.descricao}</p>
                        <h3>Selecione o formato de seu livro:</h3>
                        <div className="opcoes">
                            <AbGrupoOpcoes
                                opcoes={opcoes}
                                onChange={setOpcao}
                                valorPadrao={opcao}
                            />
                        </div>
                        <p><strong>Você terá acesso às futuras atualizações do livro.</strong></p>
                        <footer>
                            <div className="qtdeContainer">
                                <AbInputQuantidade />
                            </div>
                            <div>
                                <AbBotao texto="Comprar" />
                            </div>
                        </footer>
                    </div>
                </div>
                <div>
                    <SobreAutor autorId={livro.autor}/>
                    <BlocoSobre titulo="Sobre o livro" corpo={livro.sobre}/>
                </div>
            </div>
        </section>
    )
}

export default Livro