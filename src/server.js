/**
 * External dependencies.
 */
import express from 'express'
import { html, head, title, body, div, script, h } from '@cycle/dom'
import { makeHTMLDriver } from '@cycle/html'
import { makeHTTPDriver } from '@cycle/http'
import { run } from '@cycle/run'
import serialize from 'serialize-javascript'
import xs from 'xstream'

/**
 * Internal dependencies.
 */
import app from './app'

function wrapVTreeWithHTMLBoilerplate( [ vtree, context ] ) {
	return (
		html( [
			head( [
				title( 'Cycle Isomorphism Example' )
			] ),
			body( [
				div( '#main-container', [ vtree ] ),
				script( `window.appContext = ${ serialize( context ) };` ),
				h( 'script', { attrs: { type: 'text/javascript', src: './public/js/main.js' }}, '' ),
				h( 'img', { src: './public/js/main.js' } )
			] )
		] )
	);
}

function prependHTML5Doctype( html ) {
	return `<!doctype html>${html}`;
}

function wrapAppResultWithBoilerplate( appFn, context$ ) {
	return function wrappedAppFn( sources ) {
		const sinks = appFn( sources )
		const vdom$ = sinks.DOM
		const wrappedVDOM$ = xs.combine( vdom$, context$ )
			.map( wrapVTreeWithHTMLBoilerplate )
			.last()

		return {
			...sinks,
			DOM: wrappedVDOM$
		}
	}
}

const server = express()

// Set up serving of static assets.
server.use( '/public/js', express.static( 'dist' ) );

// Set up basic server functionality.
server.use( function ( req, res ) {
	// Ignore favicon requests
	if ( req.url === '/favicon.ico' ) {
		res.writeHead( 200, { 'Content-Type': 'image/x-icon' } );
		res.end();
		return;
	}
	console.log( `req: ${req.method} ${req.url}` );

	const context$ = xs.of( { route: req.url } );
	const wrappedAppFn = wrapAppResultWithBoilerplate( app, context$ );

	run( wrappedAppFn, {
		context: () => context$,
		DOM: makeHTMLDriver( html => { console.log( html ); res.send( prependHTML5Doctype( html ) ); } ),
	} );
} );


const port = process.env.PORT || 3000;
server.listen( port );
console.log( `Listening on port ${port}` );
