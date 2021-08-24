import React from 'react';
import styled from '@emotion/styled';
import { Cat } from '../icons';
import image from './image.png';

export default function About() {
  return (
    <Page>
      <h3>This is about page</h3>
      <Cat />
      <img src={image} />
    </Page>
  )
}

const Page = styled.div`
  background: #eeeeee;
`;