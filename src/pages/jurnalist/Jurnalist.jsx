import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import {
  Container,
  NewsContainer,
  LatestNewsSection,
  OtherNewsContainer,
  NewsItem,
  NewsImage,
  BigNewsItem,
  BigNewsTitle,
  LastConta,
  CardContainer,  // Adding a new styled component for cards
  Card,
  CardImage,
  CardTitle,
} from './styled';

const Jurnalist = ({ language }) => {
  const { data, loading, error } = useFetch(`/jurnalistik/?lang=${language}`);

  useEffect(() => {
    console.log("Selected Language:", language);
  }, [language]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || data.length === 0) {
    return <p>No data found.</p>;
  }

  const latestNews = data.slice(0, 1); // The most recent news
  const firstFiveNews = data.slice(1, 5); // Display the next 5 news items
  const remainingNews = data.slice(5);   // Remaining news items after the first 6

  const getFieldByLanguage = (news, field) => {
    switch (language) {
      case 'uz':
        return news[`${field}_uz`];
      case 'ru':
        return news[`${field}_ru`];
      default:
        return news[`${field}_uz`];
    }
  };

  return (
    <Container>
      <NewsContainer>
        <LatestNewsSection>
          {latestNews.map((news) => (
            <BigNewsItem key={news.id}>
              <Link to={`/jurnalistik/${news.id}`}>
                <NewsImage src={news.image} alt={getFieldByLanguage(news, 'title')} />
                <BigNewsTitle>{getFieldByLanguage(news, 'title')}</BigNewsTitle>
              </Link>
            </BigNewsItem>
          ))}
        </LatestNewsSection>

        <OtherNewsContainer>
          {firstFiveNews.map((news) => (
            <NewsItem key={news.id}>
              <Link to={`/jurnalistik/${news.id}`}>
                <NewsImage src={news.image} alt={getFieldByLanguage(news, 'title')} />
                <h3>{getFieldByLanguage(news, 'title')}</h3>
              </Link>
            </NewsItem>
          ))}
        </OtherNewsContainer>
      </NewsContainer>

      <NewsContainer>
        <LastConta>
          <CardContainer> {/* Wrapping remaining news in a card container */}
            {remainingNews.map((news) => (
              <Card key={news.id}>
                <Link to={`/jurnalistik/${news.id}`}>
                  <CardImage src={news.image} alt={getFieldByLanguage(news, 'title')} />
                  <CardTitle>{getFieldByLanguage(news, 'title')}</CardTitle>
                </Link>
              </Card>
            ))}
          </CardContainer>
        </LastConta>
      </NewsContainer>
    </Container>
  );
};

export default Jurnalist;
