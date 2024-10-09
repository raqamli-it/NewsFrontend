// src/components/NewsDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #555;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #444;
`;

const Category = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #777;
`;

const PublishedDate = styled.p`
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 20px;
`;

const Views = styled.p`
  font-size: 0.875rem;
  color: #999;
`;

const CommentsSection = styled.div`
  margin-top: 50px;

`;

const CommentsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const CommentItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #444;

  &:last-child {
    border-bottom: none; // Remove bottom border for the last comment
  }
`;

const Form = styled.form`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  margin-right: 8px;
  width: 75%;
  margin-bottom: 25px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const ShowMoreButton = styled(Button)`
  margin-top: 10px;
`;

const CommentIcon = styled.span`
  cursor: pointer;
  margin-top: 30px;
`;

const NewsDetail = ({ language }) => {
  const { id } = useParams(); // Get the article id from the URL
  const { data, loading, error } = useFetch(`/news/${id}`); // Fetch the news article details
  const [comment, setComment] = useState(""); // State for new comment input
  const [comments, setComments] = useState([]); // State for comments
  const [displayedComments, setDisplayedComments] = useState(3); // State to manage how many comments to display
  const [commentsVisible, setCommentsVisible] = useState(false); // State for toggling comments visibility
  const [errorMsg, setErrorMsg] = useState(null); // State for error messages

  // Submit comment function
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const newComment = { comment }; // Prepare new comment

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/news/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting comment:", response.statusText, errorData);
        setErrorMsg(`Error submitting comment: ${errorData.detail || 'Please check your input.'}`);
      } else {
        const updatedData = await response.json();
        setComments((prevComments) => [...prevComments, updatedData]); // Add new comment
        setComment(""); // Clear input
        setErrorMsg(null); // Clear error message
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setErrorMsg('An error occurred. Please try again later.');
    }
  };

  // Update comments state when data is fetched
  useEffect(() => {
    if (data?.comments) {
      setComments(data.comments);
    }
  }, [data]);

  // Toggle comments visibility
  const toggleCommentsVisibility = () => {
    setCommentsVisible((prev) => !prev); // Toggle visibility
  };

  // Show more comments
  const handleShowMoreComments = () => {
    setDisplayedComments((prev) => prev + 3); // Increase displayed comments by 3
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading news details.</div>;

  return (
    <Container>
      <Title>{language === "uz" ? data.title_uz : data.title_ru}</Title>
      <Subtitle>{language === "uz" ? data.subtitle_uz : data.subtitle_ru}</Subtitle>
      <Image src={data.image} alt={language === "uz" ? data.title_uz : data.title_ru} />
      <Content>{language === "uz" ? data.content_uz : data.content_ru}</Content>
      <Category>Category: {language === "uz" ? data.category.name_uz : data.category.name_ru}</Category>
      <PublishedDate>Published: {new Date(data.created_at).toLocaleDateString()}</PublishedDate>
      <Views>Views: {data.view_count}</Views>

      {/* Comments section */}
      <CommentsSection>
        <CommentsTitle>Comments:</CommentsTitle>
        <Form onSubmit={handleCommentSubmit}>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            required
          />
          <Button type="submit">Submit Comment</Button>
        </Form>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

        {/* Comment icon to toggle visibility */}
        <CommentIcon onClick={toggleCommentsVisibility}>
          Comments 🗨️
        </CommentIcon>

        {/* Comments list */}
        {commentsVisible && (
          <ul>
            {comments.slice(0, displayedComments).length > 0 ? (
              comments.slice(0, displayedComments).map((c) => (
                <CommentItem key={c.id}>
                  <strong>USER:</strong> {c.comment} <br />
                  <small>{new Date(c.created_at).toLocaleString()}</small>
                </CommentItem>
              ))
            ) : (
              <p>No comments yet</p>
            )}
            {displayedComments < comments.length && (
              <ShowMoreButton onClick={handleShowMoreComments}>Show More Comments</ShowMoreButton>
            )}
          </ul>
        )}
      </CommentsSection>
    </Container>
  );
};

export default NewsDetail;
