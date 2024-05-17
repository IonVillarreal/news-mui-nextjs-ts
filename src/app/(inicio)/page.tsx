import React from 'react'
import { Container, Typography } from '@mui/material'
import NewsList from '../../components/NewsList'
import { News } from '../../types/News'

const newsData: News[] = [
  {
    id: 1,
    title: 'Google revoluciona la experiencia de búsqueda',
    description:
      'Google anuncia una gran renovación de su motor de búsqueda, con el objetivo de mejorar la experiencia del usuario.',
    date: '2024-05-15',
  },
  {
    id: 2,
    title: 'Anuncios de Amazon en CES 2024',
    description:
      'Amazon revela nuevas asociaciones y tecnologías en CES 2024, incluyendo IA en vehículos con BMW.',
    date: '2024-05-15',
  },
  {
    id: 3,
    title: 'Lanzamiento de herramienta de música generada por IA',
    description:
      'Una nueva herramienta de IA que crea música para videos sin necesidad de indicaciones textuales ha sido lanzada por una startup.',
    date: '2024-05-15',
  },
  {
    id: 4,
    title: 'Actualizaciones del Google I/O 2024',
    description:
      'Google presenta el Gemini 1.5 Pro y otros avances en Google I/O 2024.',
    date: '2024-05-15',
  },
  {
    id: 5,
    title: 'Pods autoequilibrados en Alemania',
    description:
      'Alemania explora el uso de pods de transporte autoequilibrados en vías ferroviarias abandonadas.',
    date: '2024-05-15',
  },
]

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Últimas noticias
      </Typography>
      <NewsList news={newsData} />
    </Container>
  )
}

export default HomePage
