import * as React from 'react';
import { Card, EmptyState } from '@shopify/polaris';

const ErrorStateCard = () => {
  return (
    <Card sectioned>
    <EmptyState
      heading="Sorry"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
    <p>There was an error. Please try again later.</p>
    </EmptyState>
  </Card>
  )
}
export default ErrorStateCard