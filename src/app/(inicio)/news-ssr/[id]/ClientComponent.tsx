'use client'

import { useRouter } from 'next/navigation'
import { News } from '../../../../types/News'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material'
import Image from "next/legacy/image"
import { Icono } from '../../../../components/Icono'

const ClientComponent = ({ news }: { news: News }) => {
  const router = useRouter()

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

export default ClientComponent
