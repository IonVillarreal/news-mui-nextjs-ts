'use client'
import { usePathname, useRouter } from 'next/navigation'
import { WebService } from '../../../../services'
import { Constantes } from '../../../../config'
import React, { useEffect, useState } from 'react'
import { News } from '../../../../types/News'
import { imprimir } from '../../../../utils/imprimir'
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Image from "next/legacy/image"
import { Icono } from '../../../../components/Icono'

const DetalleNoticia = () => {
  const pathname = usePathname()

  const pathParts = pathname.split('/')
  const newsId = pathParts[pathParts.length - 1]

  // para las noticias
  const [news, setNews] = useState<News>()

  const router = useRouter()

  const obtenerDetalle = async () => {
    const response = await WebService.get({
      url: `${Constantes.baseUrl}/news/${newsId}`,
    })
    setNews(response)
    imprimir(response)
  }

  useEffect(() => {
    if (newsId) {
      obtenerDetalle()
    }
  }, [])

  return news ? (
    <Box>
      <Button
        variant="text"
        color="primary"
        onClick={() => router.back()}
        style={{ marginBottom: '1rem' }}
      >
        <Icono>arrow_back</Icono> Volver Atrás
      </Button>
      <Image
        src={`https://picsum.photos/200/100?random=${news.id}`}
        alt={news.title}
        width={800}
        height={400}
        layout="responsive"
      />
      <List>
        <ListItem>
          <ListItemText
            primary={<Typography variant="h5">{news.title}</Typography>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body2" color="text.secondary">
                {news.date}
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">{news.description}</Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" style={{ marginLeft: '1rem' }}>
        Cargando noticia...
      </Typography>
    </Box>
  )
}

export default DetalleNoticia
