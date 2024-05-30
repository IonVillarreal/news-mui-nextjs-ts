import { WebService } from '../../../../services'
import { Constantes } from '../../../../config'
import { News } from '../../../../types/News'
import { imprimir } from '../../../../utils/imprimir'
import ClientComponent from './ClientComponent'

type Props = {
  params: {
    id: string
  }
}

const fetchNews = async (newsId: string): Promise<News> => {
  const response = await WebService.get({
    url: `${Constantes.baseUrl}/news/${newsId}`,
  })
  imprimir(response)
  return response
}

const DetalleNoticia = async ({ params }: Props) => {
  imprimir(`params: `, params)
  const news = await fetchNews(params.id)

  return <ClientComponent news={news} />
}

export default DetalleNoticia
