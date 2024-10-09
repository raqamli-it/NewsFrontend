import { useState, useEffect } from 'react';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL; // .env'dan URL olamiz

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${endpoint}`); // API'ga to'liq URL bilan murojaat qilamiz
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, endpoint]);

  return { data, loading, error };
};

export default useFetch;
