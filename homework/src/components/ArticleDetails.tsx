import { useState, useEffect } from 'react'
import FilmsInterface from '../types/FilmsInterface'
import { useParams } from 'react-router-dom'
import { Col, Container, Row, Card } from 'react-bootstrap'

const ArticleDetails = () => {
  const params = useParams()
  const URL = 'https://api.spaceflightnewsapi.net/v4/articles/' + params.id
  const [filmDetails, setFilmDetails] = useState<FilmsInterface | null>(null)

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
        console.log(arrayFilms)
        setFilmDetails(arrayFilms)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getFilms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6}>
          {filmDetails && (
            <Card
              key={filmDetails?.id}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '2rem',
              }}
              onClick={() => {
                alert('Card Cliccata!')
              }}
            >
              <Card.Img
                variant="top"
                src={filmDetails?.image_url}
                style={{ height: '35vh', width: '70%', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{filmDetails?.title}</Card.Title>
                <Card.Text>{filmDetails?.summary}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Pubblicated: {filmDetails?.published_at.slice(0, 10)}
                </small>
              </Card.Footer>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ArticleDetails
