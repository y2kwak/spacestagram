import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, EmptyState, Page, Spinner } from '@shopify/polaris';
import {
  ChevronLeftMinor
} from '@shopify/polaris-icons';
import ImageCard from '../components/Card';
import { useAxiosGet } from '../hooks/useAxiosGet';

import './views.css';

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
      <Card sectioned>
        <EmptyState
          heading="Sorry"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
        <p>There was an error.</p>
        </EmptyState>
      </Card>
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
    <Page>
      <div className="header">
        <Button 
          icon={ChevronLeftMinor}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
      {content}
    </Page>
  )
}

export default SingleCard;