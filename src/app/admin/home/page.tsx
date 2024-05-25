'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { eliminarCookie, leerCookie } from '../../../utils/cookies'
import { WebService } from '../../../services'
import { Constantes } from '../../../config'
import { imprimir } from '../../../utils/imprimir'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import NewsListAdmin from './ui/NewsListAdmin'

export interface userType {
  id: number
  username: string
}

const AdminHomePage = () => {
  const [user, setUser] = useState<userType | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = leerCookie('token')
      try {
        const response = await WebService.get({
          url: `${Constantes.baseUrl}/user/me` ?? '',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        imprimir(response)

        setUser(response)
      } catch (error) {
        eliminarCookie('token')
        router.replace('/login')
      }
    }

    fetchUser()
  }, [])

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      {user ? (
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}>
                <Typography variant="h6" component="p" sx={{ pb: 1 }}>
                  Bienvenido, {user.username}.
                </Typography>
              </Grid>
            </Grid>
            <NewsListAdmin />
          </CardContent>
        </Card>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
          <Typography variant="h6" style={{ marginLeft: '1rem' }}>
            Cargando usuario...
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default AdminHomePage
