import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const useFetchData = (url, actions) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const parsedData = await response.json();
        setData(parsedData);
        dispatch(actions.successAction(parsedData));
      } catch (err) {
        setError(err);
        dispatch(actions.failureAction(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {data, isLoading, error};
};

export {useFetchData};
