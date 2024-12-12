import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import FilmsInterface from '../types/FilmsInterface'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const URL = 'https://api.spaceflightnewsapi.net/v4/articles'

  const [filmCards, setFilmCards] = useState<FilmsInterface[]>([])

  const navigate = useNavigate()

  const getFilms = () => {
    fetch(URL)
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json()
        } else {
          throw new Error('Qualcosa è andato storto')
        }
      })
      .then((arrayFilms) => {
        console.log(arrayFilms.results)
        setFilmCards(arrayFilms.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getFilms()
  }, [])

  return (
    <Container>
      <Row>
        {filmCards.map((film) => (
          <Col xs={4} className="g-4" style={{ height: '100vh' }}>
            <Card
              key={film.id}
              style={{ height: '100%' }}
              onClick={() => {
                navigate(`/articles/${film.id}`)
              }}
            >
              <Card.Img
                variant="top"
                src={film.image_url}
                style={{ height: '23vh' }}
              />
              <Card.Body>
                <Card.Title>{film.title}</Card.Title>
                <Card.Text>{film.summary}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Pubblicated: {film.published_at.slice(0, 10)}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MainPage
