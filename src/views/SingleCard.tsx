import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Page, Spinner } from '@shopify/polaris';

import ImageCard from '../components/Card';
import { useAxiosGet } from '../hooks/useAxiosGet';
import Header from '../components/Header';
import ErrorStateCard from '../components/ErrorStateCard';

import './views.css';
import '../styles.css'

type CardParams = {
  id: string
}

function SingleCard(){
  const { id }  = useParams<CardParams>();
  const url = `https://api.nasa.gov/planetary/apod?date=${id}&api_key=zeJyIpkuec7yalITA6AKk4Bw0ihw6WrnpfSAUcAp`
  let response = useAxiosGet(url)
  let content = null
  if(response.error) {
    content =
      <ErrorStateCard/>
  } 

  if (response.loading) {
    content = 
      <div className="center flex">
        <Spinner accessibilityLabel="SpinnerExample"/>
      </div>
  }

  if (response.data) {
    content = 
    <ImageCard 
        title={response.data["title"]}
        date={response.data["date"]}
        imageUrl={response.data["url"]}
        description={response.data["explanation"]}
        credit={response.data["copyright"]}
        isSingleCard={true}
      />
  }
  
  return (
    <div className="mb-xxl">
      <Header isHomeHeader={false}/>
      <div className="page-container">
        {content}
      </div>
    </div>
    
  )
}

export default SingleCard;