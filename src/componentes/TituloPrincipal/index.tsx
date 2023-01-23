import './TituloPrincipal.css'

interface TituloPrincipalProps {
    texto: string
}

const TituloPrincipal = ({ texto } : TituloPrincipalProps) => {
    return (<h4 className='titulo-principal'>{texto}</h4>)
}

export default TituloPrincipal