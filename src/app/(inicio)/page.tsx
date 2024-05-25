'use client'
import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import NewsList from './ui/NewsList'
import { News } from '../../types/News'
import axios from 'axios'

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<Array<News>>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/news`
        )
        setNews(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching news:', error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Últimas noticias
      </Typography>
      <NewsList news={news} />
    </Container>
  )
}

export default HomePage
