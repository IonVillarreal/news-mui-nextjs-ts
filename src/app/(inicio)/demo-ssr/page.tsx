//'use server'
import React from 'react'
import { Container, Typography } from '@mui/material'

import axios from 'axios'
import NewsList from '@/components/NewsList'
import { News } from '@/types/News'

async function fetchNews() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`)
  return response.data
}

const DemoSSRPage = async () => {
  const news = await fetchNews()
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Últimas noticias
      </Typography>
      <NewsList news={news} />
    </Container>
  )
}

export default DemoSSRPage
