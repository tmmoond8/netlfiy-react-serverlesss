import React from 'react';
import styled from '@emotion/styled';
import { Fish } from '../icons';

export default function About() {
  return (
    <Page>
      <h3>This is home page</h3>
      <Fish />
    </Page> 
    
  )
}

const Page = styled.div`
  background: #eeeeee;
`;