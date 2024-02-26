import React, { createContext, useContext, useState } from 'react';
import URL_LINKS from '../constants/urls';
import axios from 'axios';
import { abstractService } from '../services/abstractService';

const JournalContext = createContext(null);

export const useJournal = () => useContext(JournalContext);
export const JournalProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoData, setVideoData] = useState(null);

  const [journalMetadata, setJournalMetadata] = useState(null);

  const fetchMetadata = async (doi: string) => {
    const url = `${URL_LINKS.FETCH_METADATA.value}`;
    try {
      const response = await axios.post(url, { doi });
      if (response.data.status === 'success') {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      // throw error
      throw new Error("Error fetch metadata " + error);

    }
    return null;
  };

  const fetchAbstract = async (identifier: string) => {
    return abstractService.retrieveAbstractData(identifier);
  };

  return (
    <JournalContext.Provider value={{ videoData, setVideoData, journalMetadata, setJournalMetadata, fetchMetadata,fetchAbstract }}>
      {children}
    </JournalContext.Provider>
  );
};

