// src/pages/cotegroys/NewsList.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
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
import PropTypes from 'prop-types';

const NewsList = ({ language }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category') || '';

  // Fetch all news based on language
  const { data: newsData = [], loading, error } = useFetch(`/news/?lang=${language}`);

  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    if (Array.isArray(newsData)) {
      if (selectedCategory) {
        setFilteredNews(
          newsData.filter(news => news.category && news.category.name_uz === selectedCategory)
        );
      } else {
        setFilteredNews(newsData);
      }
    }
  }, [newsData, selectedCategory]);

  const [visibleCards, setVisibleCards] = useState(3); // Initially 3 cards

  const loadMoreCards = () => {
    setVisibleCards(prev => prev + 3); // Add 3 more cards each time
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  if (!filteredNews || filteredNews.length === 0) {
    return <p>No data found.</p>;
  }

  // Split news into sections
  const latestNews = filteredNews.slice(0, 1);
  const firstFiveNews = filteredNews.slice(1, 5);
  const remainingNews = filteredNews.slice(5);

  const getFieldByLanguage = (newsItem, field) => {
    switch (language) {
      case "ru":
        return newsItem[`${field}_ru`];
      case "uz":
      default:
        return newsItem[`${field}_uz`];
    }
  };

  return (
    <Container>
      <NewsContainer>
        {/* Latest News */}
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

        {/* Other News */}
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

      {/* Additional Cards */}
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

NewsList.propTypes = {
  language: PropTypes.string.isRequired,
};

export default NewsList;
