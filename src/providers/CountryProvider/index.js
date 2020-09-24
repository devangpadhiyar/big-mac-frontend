import React, { useEffect } from 'react';
import publicIp from 'public-ip';
import { getCountryData } from '../../api/country';

const CountryContext = React.createContext();

const initialState = {
  status: '',
  data: null,
};

function countryReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, status: 'loading', data: action.data };
    case 'ERROR':
      return { ...state, status: 'error', data: action.data };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.data };
    default:
      throw new Error(`Unsupported action type! ${action.type}`);
  }
}

function CountryProvider(props) {
  const [state, dispatch] = React.useReducer(countryReducer, initialState);
  return <CountryContext.Provider value={[state, dispatch]} {...props} />;
}

function useCountry() {
  const context = React.useContext(CountryContext);
  if (!context) {
    throw new Error(`useCountry must be used within a CountryProvider`);
  }
  const [state, dispatch] = context;

  const loadCountry = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await getCountryData();
      if (response.status === 200) {
        dispatch({ type: 'SUCCESS', data: response.data.data });
      } else {
        dispatch({ type: 'ERROR', data: response.data });
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR', data: e });
    }
  };

  return {
    state,
    dispatch,
    loadCountry,
  };
}

export { useCountry, CountryProvider };
