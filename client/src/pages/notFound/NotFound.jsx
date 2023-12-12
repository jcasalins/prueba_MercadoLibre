import Main from '../../components/main/Main'
import SEO from '../../components/SEO/Index'

function NotFound() {
  return (
    <>
      <SEO title='No hay resultados'/>
      <Main>
        <div className="grid justify-center py-40">
          <h1>No hay resultados</h1>
        </div>
      </Main>
    </>
  )
}

export default NotFound