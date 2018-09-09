import xs from 'xstream';
import { run } from '@cycle/run';
import { h, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import app from './app';

const postsEndpoint = 'http://local.wordpress.test/wp-json/wp/v2/posts';

function clientSideApp( sources ) {
	const sinks = app( sources );
	sinks.DOM = sinks.DOM

	const request$ = xs.of( {
		url: postsEndpoint, // GET method by default
		category: 'posts',
	} )

	return {
		...sinks,
		HTTP: request$,
		LOG: sinks.LOG
	};
}

run( clientSideApp, {
	context: () => xs.of( window.appContext ),
	DOM: makeDOMDriver( '#main-container' ),
	HTTP: makeHTTPDriver(),
	LOG: ( msg$ ) => { msg$.addListener( { next: console.log } ) }
} );
