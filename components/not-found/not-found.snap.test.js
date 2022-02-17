import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import NotFound from './not-found';

it(`Should NotFound render correctly`, () => {
  const history = createMemoryHistory();

  const {container} = render(
      <Router history={history}>
        <NotFound />
      </Router>
  );
  expect(container).toMatchSnapshot();
});
