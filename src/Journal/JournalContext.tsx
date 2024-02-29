import React, { createContext, useContext, useState } from 'react';
import URL_LINKS from '../constants/urls';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { abstractService } from '../services/abstractService';

const JournalContext = createContext({
  loadingMetadata: false,
  setLoadingMetadata: () => {},
  videoData: null,
  setVideoData: () => {},
  journalMetadata: null,
  setJournalMetadata: () => {},
  fetchMetadata: async (doi: string) => {},
  fetchAbstract: async (doi: string, identifier: string): Promise<any> => {},
  fetchVideo: async (videoId: string) => {},
  callVideo: () => {},
  error: null,
});
export const useJournal = () => useContext(JournalContext);
export const JournalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [journalMetadata, setJournalMetadata] = useState(null);
  const [error, setError] = useState(null);

  const fetchMetadata = async (doi: string) => {
    const url = `${URL_LINKS.FETCH_METADATA.value}?doi=${doi}`;
    try {
      setLoadingMetadata(true); // Set loadingMetadata to true
      const response = await axios.get(url);
      if (response.data.status === 'success') {
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      // throw error
      throw new Error('Error fetch metadata ' + error);
    } finally {
      setLoadingMetadata(false); // Set loadingMetadata back to false
    }
    return null;
  };

  const fetchAbstract = async (doi: string, identifier: string) => {
    try {
      const response = await abstractService.retrieveAbstractData(
        doi,
        identifier,
      );
      return response;
    } catch (error) {
      throw new Error('Error fetching abstract: ' + error);
    }
  };

  //fetch video
  const fetchVideo = async (videoId: string) => {};

  const callVideo = () => {};

  return (
    <JournalContext.Provider
      value={{
        loadingMetadata,
        setLoadingMetadata,
        videoData,
        setVideoData,
        journalMetadata,
        setJournalMetadata,
        fetchMetadata,
        fetchAbstract,
        fetchVideo,
        callVideo,
        error,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
