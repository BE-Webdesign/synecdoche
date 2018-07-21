import xs from 'xstream';
import {run} from '@cycle/run';
import {div, button, p, makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

const postsEndpoint = 'http://local.wordpress.test/wp-json/wp/v2/posts';

function main(sources) {
  const action$ = xs.merge(
    sources.DOM.select('.decrement').events('click').map(ev => -1),
    sources.DOM.select('.increment').events('click').map(ev => +1)
  );

  const request$ = xs.of({
    url: postsEndpoint, // GET method by default
    category: 'hello',
  });

  const response$ = sources.HTTP
    .select('hello')
    .flatten()
    .addListener({
      next: httpResponse => {
        // httpResponse is the object we get as response from superagent.
        // Check the documentation in superagent to know the structure of
        // this object.
        console.log(httpResponse.status); // 200
      },
      error: (err) => {
        // This is a network error
        console.error(err);
      },
      complete: () => {},
    })

  const count$ = action$.fold((acc, x) => acc + x, 0);
  const vdom$ = count$.map(count =>
    div([
      button('.decrement', 'Decrement'),
      button('.increment', 'Increment'),
      p('Counter: ' + count)
    ])
  );
  return {
    DOM: vdom$,
    HTTP: request$,
  };
}

run(main, {
  DOM: makeDOMDriver('#main-container'),
  HTTP: makeHTTPDriver()
});
