// src/pages/categories/NewsList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  CardContainer,
  Card,
  CardImage,
  CardTitle,
  SectionTitle,
} from './styled';

const NewsList = ({ language, news }) => {
  const [visibleCards, setVisibleCards] = useState(3); // Dastlabki 3 ta karta

  useEffect(() => {
    setVisibleCards(3); // Kategoriya o'zgarganda kartalarni qayta tiklash
  }, [news]);

  if (!news || news.length === 0) {
    return <p>No data found.</p>;
  }

  // Yangiliklarni bo'limlarga ajratish
  const latestNews = news.slice(0, 1);
  const firstFiveNews = news.slice(1, 5);
  const remainingNews = news.slice(5);

  const getFieldByLanguage = (newsItem, field) => {
    switch (language) {
      case "ru":
        return newsItem[`${field}_ru`];
      case "uz":
      default:
        return newsItem[`${field}_uz`];
    }
  };

  const loadMoreCards = () => {
    setVisibleCards((prev) => prev + 3); // Har safar 3 ta karta qo'shish
  };

  return (
    <Container>
      <NewsContainer>
        {/* So'nggi yangilik */}
        <LatestNewsSection>
          <SectionTitle>Latest News</SectionTitle>
          {latestNews.map((newsItem) => (
            <BigNewsItem key={newsItem.id}>
              <Link to={`/news/${newsItem.id}`}>
                <NewsImage
                  src={newsItem.image}
                  alt={getFieldByLanguage(newsItem, "title")}
                />
                <BigNewsTitle>{getFieldByLanguage(newsItem, "title")}</BigNewsTitle>
              </Link>
            </BigNewsItem>
          ))}
        </LatestNewsSection>

        {/* Boshqa yangiliklar */}
        <OtherNewsContainer>
          {firstFiveNews.map((newsItem) => (
            <NewsItem key={newsItem.id}>
              <Link to={`/news/${newsItem.id}`}>
                <NewsImage
                  src={newsItem.image}
                  alt={getFieldByLanguage(newsItem, "title")}
                />
                <h3>{getFieldByLanguage(newsItem, "title")}</h3>
              </Link>
            </NewsItem>
          ))}
        </OtherNewsContainer>
      </NewsContainer>

      {/* Qo'shimcha kartalar */}
      <NewsContainer>
        <LastConta>
          <CardContainer>
            {remainingNews.slice(0, visibleCards).map((newsItem) => (
              <Card key={newsItem.id}>
                <Link to={`/news/${newsItem.id}`}>
                  <CardImage
                    src={newsItem.image}
                    alt={getFieldByLanguage(newsItem, "title")}
                  />
                  <CardTitle>{getFieldByLanguage(newsItem, "title")}</CardTitle>
                </Link>
              </Card>
            ))}
          </CardContainer>
          {visibleCards < remainingNews.length && (
            <button onClick={loadMoreCards}>Load More</button>
          )}
        </LastConta>
      </NewsContainer>
    </Container>
  );
};

export default NewsList;
