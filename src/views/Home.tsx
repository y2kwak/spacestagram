import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import { Button, Page, Spinner } from '@shopify/polaris';
import { PlusMinor } from '@shopify/polaris-icons';

import ImageCard from '../components/Card';
import Header from '../components/Header';
import './views.css';

const Home = () => {
  // States
  const [requestStatus, setRequestStatus] = React.useState({
    loading: false,
    error: false,
  });
  const [imagesList, setImagesList] = React.useState<any[]>([]);
  const [apiStartDate, setApiStartDate] = React.useState<string>(moment().subtract(6, "d").format("YYYY-MM-DD"));
  const [apiEndDate, setApiEndDate] = React.useState<string>(moment().format("YYYY-MM-DD"));

  React.useEffect(() => {
    // Load images on initial load
    loadMoreImages();
  }, []);

  function loadMoreImages() {
    setRequestStatus({
      loading: true,
      error: false,
    })
    axios({
      method: "GET",
      url: "https://api.nasa.gov/planetary/apod",
      params: { 
        api_key: "zeJyIpkuec7yalITA6AKk4Bw0ihw6WrnpfSAUcAp",
        start_date: apiStartDate,
        end_date: apiEndDate,
      },
    })
      .then((res) => {
        setImagesList((prevTitles) => {
          return prevTitles.concat(res.data.reverse())
        });
        setRequestStatus({
          loading: false,
          error: false,
        })
        setApiEndDate((prevDate) => moment(prevDate).subtract(7, "d").format("YYYY-MM-DD"))
        setApiStartDate((prevDate) => moment(prevDate).subtract(6, "d").format("YYYY-MM-DD"))
      })
      .catch((e) => {
        setRequestStatus({
          loading: false,
          error: true,
        })      
      });
  }

  return (
    <div>
      <Header isHomeHeader={true}/>
      <div className="pageContainer">
        {imagesList.map((item) => {
          return(
            <ImageCard 
              key={item.date}
              title={item.title}
              date={item.date}
              imageUrl={item.url}
              description={item.explanation}
              credit={item.copyright}
              isSingleCard={false}
            />
          )}
        )}

        {requestStatus.loading  &&
          <div className="center flex header">
            <Spinner accessibilityLabel="SpinnerExample"/>
          </div>
        }
        {!requestStatus.loading && 
          <div className="header">
            <Button 
              fullWidth 
              icon={PlusMinor} 
              onClick={() => {
                loadMoreImages()
              }}
            >
              Load more
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;