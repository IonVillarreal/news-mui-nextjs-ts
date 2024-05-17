// src/app/layout.tsx

import React, { PropsWithChildren } from 'react'
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material'
import Link from 'next/link'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Mi Aplicación de Noticias
          </Typography>
          <Button color="primary" component={Link} href="/inicio">
            Inicio
          </Button>
          <Button color="primary" component={Link} href="/inicio/about">
            Acerca de
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ p: 2 }}>{children}</Container>
    </>
  )
}

export default Layout
