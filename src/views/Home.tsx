import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, DisplayText, Page, Spinner } from '@shopify/polaris';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import ImageCard from '../components/Card';
import './views.css';
import { useAxiosGet } from '../hooks/useAxiosGet';

function Home() {
  let apiStartDate = moment().subtract(7, "d").format("YYYY-MM-DD");
  const url = `https://api.nasa.gov/planetary/apod?start_date=${apiStartDate}&api_key=zeJyIpkuec7yalITA6AKk4Bw0ihw6WrnpfSAUcAp`

  let response = useAxiosGet(url)

  const [imagesList, setImagesList] = React.useState<any[]>([]);
  const [startDate, setStartDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if(!response.error && response.data) {
      setImagesList(response.data)
    }
    return
  }, [response.data, response.error])
 
  return (
      <Page>
        <div className="flex space-between header">
          <div>
            <DisplayText size="large">Spacestagram</DisplayText>
            <p>Brought to you by NASA's Photo of the Day (APOD) API!</p>
          </div>
          <div className="datePicker">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              shouldCloseOnSelect={false}
            />
            <Link to={`/image/${moment(startDate).format("YYYY-MM-DD")}`}>
              <div className="datePickerBtn">
                <Button primary size="slim">Go!</Button>
              </div>
            </Link>
          </div>
        </div>
        
        {response.loading  ? (
          <div className="center flex">
            <Spinner accessibilityLabel="SpinnerExample"/>
          </div>
        ) : (
            imagesList.map((item) => {
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
            )
        )}
      </Page>
  )
}

export default Home;