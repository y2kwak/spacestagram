import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, DisplayText } from '@shopify/polaris';
import { ChevronLeftMinor, HomeMajor } from '@shopify/polaris-icons';

import logo from '../shopify-logo.svg';
import './components.css';
import '../styles.css'

type HeaderProps = {
  isHomeHeader: boolean,
}

const Header: React.FC<HeaderProps>= (props) => {
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(new Date());

  return (
    <div className="flex header-container">
      {props.isHomeHeader ? (
        <div className="flex align-center">
          <img className="logo"src={logo} alt="shopify-logo"/>
          <div className="ml-m">
            <DisplayText size="large">Spacestagram</DisplayText>
            <p>Brought to you by <a href="http://api.nasa.gov/">NASA&apos;s Photo of the Day (APOD) API</a>!</p>
          </div>
        </div>
      ) : (
        <div>
          {window.history.length <= 2 ? (
            // Button to Home if there's no history
            <Link to="/">
              <Button icon={HomeMajor}>
                Home
              </Button>
            </Link>
          ) : (
            <Button icon={ChevronLeftMinor} onClick={() => window.history.back()}>
              Back
            </Button>)}
        </div>
      )}
      
      <div className="flex align-center">
        <DatePicker
          selected={datePickerDate}
          onChange={(date: Date) => setDatePickerDate(date)}
          shouldCloseOnSelect={false}
          maxDate={new Date()}
        />
        <Link to={`/image/${moment(datePickerDate).format("YYYY-MM-DD")}`}>
          <div className="ml-m">
            <Button primary size="slim">Go!</Button>
          </div>
        </Link>
      </div>
      
    </div>
  )
}
export default Header;