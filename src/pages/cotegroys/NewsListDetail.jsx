// src/pages/categories/NewsListDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {
  Container,
  ContentWrapper,
  VideoSection,
  Form,
  Input,
  Button,
  ErrorMessage,
  CommentIcon,
  Title,
} from "./detailstyle";

const NewsListDetail = ({ language }) => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/news/${id}/`); // Fetch data from API
  const [comment, setComment] = useState(""); // State for new comment input
  const [comments, setComments] = useState([]); // State for fetched comments
  const [errorMsg, setErrorMsg] = useState(null); // State for error messages
  const [displayedComments, setDisplayedComments] = useState(3); // State to manage how many comments to display
  const [commentsVisible, setCommentsVisible] = useState(false); // State for toggling comments visibility

  // Get registered user's name from localStorage
  const userName = localStorage.getItem("userName") || "Guest";

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!comment.trim()) {
      setErrorMsg("Komentariyani to'ldiring.");
      return;
    }

    // Include user name with the comment
    const newComment = {
      comment,
      full_name: userName, // Include user name in the comment
    };

    // Get the token from localStorage
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/news/${id}/`, // API endpoint yangilik komentariyalar uchun
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Send data in JSON format
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          body: JSON.stringify(newComment), // Send the comment in JSON format
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error submitting comment:",
          response.statusText,
          errorData
        );
        setErrorMsg(
          `Error submitting comment: ${
            errorData.detail || "Please check your input."
          }`
        );
      } else {
        const updatedData = await response.json();
        setComments((prevComments) => [...prevComments, updatedData]); // Add the new comment to the list
        setComment(""); // Clear the input
        setErrorMsg(null); // Clear error message
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setErrorMsg("An error occurred. Please try again later.");
    }
  };

  // Update comments state when data changes
  useEffect(() => {
    if (data?.comments) {
      setComments(data.comments); // Set comments from the fetched data
    }
  }, [data]);

  // Toggle to show more comments
  const handleShowMoreComments = () => {
    setDisplayedComments((prev) => prev + 3); // Increase displayed comments by 3
  };

  // Toggle comments visibility
  const toggleCommentsVisibility = () => {
    setCommentsVisible((prev) => !prev); // Toggle visibility
  };

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error occurred: {error}</p>; // Show error state

  // Retrieve title and content based on selected language
  const title = language === "ru" ? data.title_ru : data.title_uz;
  const subtitle = language === "ru" ? data.subtitle_ru : data.subtitle_uz;
  const content = language === "ru" ? data.content_ru : data.content_uz;
  const time = language === "ru" ? data.time_ru : data.time_uz;

  return (
    <Container>
      {data && (
        <>
          <ContentWrapper>
            <Title>{title}</Title>
            <small>{time}</small>
            <small> 👁️‍🗨️ {data.view_count}</small>
          </ContentWrapper>
          <VideoSection>
            {data.link ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  data.link.includes("v=")
                    ? data.link.split("v=")[1].split("&")[0]
                    : ""
                }`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No video available</p>
            )}
          </VideoSection>
          <p>{subtitle}</p>

          <p
            dangerouslySetInnerHTML={{
              __html: content.replace(/\n/g, "<br />"),
            }}
          ></p>

          {/* Comment icon to toggle visibility */}
          <CommentIcon onClick={toggleCommentsVisibility}>
            Comments 🗨️
          </CommentIcon>

          {/* Comments section */}
          {commentsVisible && (
            <div>
              {comments.slice(0, displayedComments).length > 0 ? (
                comments.slice(0, displayedComments).map((c, index) => (
                  <div key={index}>
                    <p>
                      <strong>{c.full_name || "Guest"}:</strong> {c.comment}
                    </p>
                    <small>{new Date(c.created_at).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}

              {displayedComments < comments.length && (
                <Button onClick={handleShowMoreComments}>
                  Show More Comments
                </Button>
              )}
              <Form onSubmit={handleCommentSubmit}>
                <Input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comment"
                  required
                />
                <Button type="submit">Submit Comment</Button>
              </Form>
              {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default NewsListDetail;
