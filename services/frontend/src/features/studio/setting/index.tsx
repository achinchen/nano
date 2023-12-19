import { Fragment } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { StudioSettingContextProvider } from './context';

export default function Setting() {
  return (
    <StudioSettingContextProvider>
      <Fragment>
        <Header />
        <Content />
      </Fragment>
    </StudioSettingContextProvider>
  );
}
