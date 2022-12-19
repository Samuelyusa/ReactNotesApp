import React from 'react';
import { LangConsumer } from '../contexts/LangContext';



const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <LangConsumer>
      {
        ({ language }) => {
            if(language === 'id') {
            return new Date(date).toLocaleDateString('id-ID', options);
          }
            else{
            return new Date(date).toLocaleDateString('en-EN', options);
          }
        }
      }
    </LangConsumer>
  )
}

export { showFormattedDate };
