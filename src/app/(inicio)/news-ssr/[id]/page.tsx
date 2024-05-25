import { WebService } from '../../../../services'
import { Constantes } from '../../../../config'
import { News } from '../../../../types/News'
import { imprimir } from '../../../../utils/imprimir'
import ClientComponent from './ClientComponent'

type Props = {
  params: {
    newsId: string
  }
}

export async function fetchNews(newsId: string): Promise<News> {
  const response = await WebService.get({
    url: `${Constantes.baseUrl}/news/${newsId}`,
  })
  imprimir(response)
  return response
}

const DetalleNoticia = async ({ params }: Props) => {
  const news = await fetchNews(params.newsId)

  return <ClientComponent news={news} />
}

export default DetalleNoticia
