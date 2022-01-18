import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, DisplayText } from '@shopify/polaris';
import {
  ChevronLeftMinor
} from '@shopify/polaris-icons';
import '../styles.css'

type HeaderProps = {
  isHomeHeader: boolean
}

const Header: React.FC<HeaderProps>= (props) => {
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(new Date());

  return (
    <div className="flex space-between p-xl flex-wrap">
      {props.isHomeHeader ? (
        <div>
          <DisplayText size="large">Spacestagram</DisplayText>
          <p>Brought to you by NASA's Photo of the Day (APOD) API!</p>
        </div>
      ) : (
        <div>
          <Button 
            icon={ChevronLeftMinor}
            onClick={() => 
              {
                if (window.history.length > 1) window.history.back()
                else window.history.go(-1)
              }
              }
          >
            Back
          </Button>
        </div>
      )}
      
      <div className="datePicker">
        <DatePicker
          selected={datePickerDate}
          onChange={(date: Date) => setDatePickerDate(date)}
          shouldCloseOnSelect={false}
        />
        <Link to={`/spacestagram/image/${moment(datePickerDate).format("YYYY-MM-DD")}`}>
          <div className="datePickerBtn">
            <Button primary size="slim">Go!</Button>
          </div>
        </Link>
      </div>
      
    </div>
  )
}
export default Header;