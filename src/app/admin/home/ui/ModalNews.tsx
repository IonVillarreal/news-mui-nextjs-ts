// @flow
import Box from '@mui/material/Box'
import { Button, DialogContent, Grid, Typography } from '@mui/material'
import { FormInputText } from '../../../../components/form'
import ProgresoLineal from '../../../../components/progreso/ProgresoLineal'
import { useForm } from 'react-hook-form'
import { News } from './NewsListAdmin'
import { WebService } from '../../../../services'
import { imprimir } from '../../../../utils/imprimir'
import { useState } from 'react'

type Props = {
  noticia: News | null | undefined
  handleClose: () => void
}

export const ModalNews = ({ noticia, handleClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, control } = useForm<News>({
    defaultValues: {
      id: noticia?.id,
      description: noticia?.description,
      title: noticia?.title,
    },
  })

  async function crearOActualizar(noticia: News) {
    try {
      setLoading(true)

      if (noticia.id) {
        const response = await WebService.put({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${noticia.id}`,
          body: noticia,
        })
        console.log(response)
      } else {
        const response = await WebService.post({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/news`,
          body: noticia,
        })
        console.log(response)
      }
    } catch (error) {
      imprimir(error)
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  return (
    <DialogContent>
      <Grid container direction={'column'} justifyContent="space-evenly">
        <form onSubmit={handleSubmit(crearOActualizar)}>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={'titulo'}
              control={control}
              name="title"
              label="Título"
              size={'medium'}
              labelVariant={'subtitle1'}
              disabled={loading}
              rules={{ required: 'Este campo es requerido' }}
            />
          </Grid>
          <Box sx={{ mt: 1, mb: 1 }}></Box>
          <Grid item xs={12} sm={12} md={12}>
            <FormInputText
              id={'description'}
              control={control}
              name="description"
              label="Descripción"
              size={'medium'}
              rows={5}
              multiline
              labelVariant={'subtitle1'}
              disabled={loading}
              rules={{
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              }}
            />
          </Grid>

          <Box sx={{ mt: 0.5, mb: 0.5 }}>
            <ProgresoLineal mostrar={loading} />
          </Box>
          <Box sx={{ height: 15 }}></Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            <Typography sx={{ fontWeight: '600' }}>Guardar</Typography>
          </Button>
        </form>
      </Grid>
    </DialogContent>
  )
}
