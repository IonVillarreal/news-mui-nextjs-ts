import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { IconoTooltip } from '../../../../components/botones/IconoTooltip'
import { WebService } from '../../../../services'
import { CustomDialog } from '../../../../components/dialog/CustomDialog'
import { AlertDialog } from '../../../../components/dialog/AlertDialog'
import { Constantes } from '../../../../config'
import { ModalNews } from './ModalNews'

export interface News {
  id?: number
  title: string
  description: string
  date?: string
}

const NewsAdminList: React.FC = () => {
  // para las noticias
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [currentNew, setCurrentNew] = useState<News | null>()
  const [openModalEdicion, setOpenModalEdicion] = useState<boolean>(false)
  const [openAlertaBorrar, setAlertaBorrar] = useState<boolean>(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await WebService.get({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/news`,
      })
      setNews(response)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const eliminarPeticion = async (noticia: News) => {
    try {
      await WebService.delete({
        url: `${Constantes.baseUrl}/news/${noticia.id}`,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const editarNoticia = (noticia: News) => {
    setCurrentNew(noticia)
    setOpenModalEdicion(true)
  }

  const cerrarModal = async () => {
    setCurrentNew(null)
    setOpenModalEdicion(false)
    await fetchNews()
  }

  const abrirAlertaBorrar = (noticia: News) => {
    setCurrentNew(noticia)
    setAlertaBorrar(true)
  }

  const aceptarAlertaBorrar = async () => {
    if (!currentNew) {
      return
    }
    await eliminarPeticion(currentNew)
    setAlertaBorrar(false)
    await fetchNews()
  }

  const cerrarAlertaBorrar = () => {
    setAlertaBorrar(false)
  }

  return (
    <>
      <AlertDialog
        isOpen={openAlertaBorrar}
        titulo={'Alerta'}
        texto={`¿Esta seguro de borrar la noticia?`}
      >
        <Button variant={'outlined'} onClick={cerrarAlertaBorrar}>
          Cancelar
        </Button>
        <Button variant={'contained'} onClick={aceptarAlertaBorrar}>
          Aceptar
        </Button>
      </AlertDialog>
      <CustomDialog
        isOpen={openModalEdicion}
        handleClose={cerrarModal}
        title={'Editar noticia'}
      >
        <ModalNews noticia={currentNew} handleClose={cerrarModal} />
      </CustomDialog>
      <Grid container sx={{ pb: 2 }}>
        <Grid item xs={6} sm={6} md={6}>
          Aquí puedes gestionar la aplicación
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'end'}
            flexDirection={'row'}
          >
            <Button
              variant={'contained'}
              onClick={() => {
                setOpenModalEdicion(true)
              }}
            >
              Agregar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {news.map((item) => (
          <Grid item xs={12} sm={6} md={6} key={item.id}>
            <Card>
              <Image
                src={`https://picsum.photos/200/100?random=${item.id}`}
                alt={item.title}
                width={200}
                height={100}
                layout="responsive"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.date}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </CardContent>
              <CardActions>
                <Grid container flexDirection={'row'} alignItems={'end'}>
                  <Grid item>
                    <Box
                      display={'flex'}
                      justifyContent={'end'}
                      flexDirection={'row'}
                    >
                      <IconoTooltip
                        titulo={'editar'}
                        icono={'edit'}
                        accion={() => {
                          editarNoticia(item)
                        }}
                        name={'editar'}
                        id={`${item.id}`}
                      />
                      <IconoTooltip
                        titulo={'eliminar'}
                        icono={'delete'}
                        color={'error'}
                        accion={() => {
                          abrirAlertaBorrar(item)
                        }}
                        name={'eliminar'}
                        id={`${item.id}`}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default NewsAdminList
