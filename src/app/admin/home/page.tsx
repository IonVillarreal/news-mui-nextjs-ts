'use client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { eliminarCookie, leerCookie } from '../../../utils/cookies'
import { WebService } from '../../../services'
import { Constantes } from '../../../config'
import { imprimir } from '../../../utils/imprimir'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'

export interface userType {
  id: number
  username: string
}

const AdminHomePage = () => {
  const [user, setUser] = useState<userType | null>(null)

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
        console.error('Error fetching user:', error)
        redirect('/login')
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    console.log('user: ', user)
  }, [user])

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      {user ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Página de Administrador
            </Typography>
            <Typography variant="h6" component="p">
              Bienvenido, {user.username}. Aquí puedes gestionar la aplicación.
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="primary">
                Gestionar Usuarios
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: '1rem' }}
              >
                Ver Reportes
              </Button>
            </Box>
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
