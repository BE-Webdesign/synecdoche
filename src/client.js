import xs from 'xstream';
import { run } from '@cycle/run';
import { h, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import app from './app';

function clientSideApp( sources ) {
	const sinks = app( sources );
	sinks.DOM = sinks.DOM.drop( 1 );
	return {
		...sinks,
		DOM: xs.of( h( 'div', 'Client Loaded' ) )
	};
}

function preventDefaultDriver( ev$ ) {
	ev$.addListener( {
		next: ev => ev.preventDefault(),
	} );
}

run( clientSideApp, {
	context: () => xs.of( window.appContext ),
	DOM: makeDOMDriver( '#main-container' ),
	HTTP: makeHTTPDriver(),
	PreventDefault: preventDefaultDriver
} );
