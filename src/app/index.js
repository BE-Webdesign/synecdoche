import xs from 'xstream';
import { run } from '@cycle/run';
import { h, div, button, p, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

function posts( posts ) {
	return h(
		'div',
		{ class: { posts: true } },
		posts.map( post )
	)
}

function post( post ) {
	return h( 'div', { class: { post: true } }, [ post.title.rendered ] )
}

function model( posts$ ) {
	return posts$.map( posts => {
		return {
			posts
		}
	} )
}

function view( state$ ) {
	return state$.map( state => {
		return h(
			'div',
			{ class: { app: true } },
			[
				h( 'h1', { class: { 'app__title': true } }, [ 'Posts' ] ),
				posts( state.posts )
			]
		)
	} )
}

export default function app( sources ) {
	const response$ = sources.HTTP
		.select('posts')
		.flatten()
		.map( res => res.body )

	const state$ = model( response$ )

	// const vdom$ = xs.of( h( 'div', {}, 'Hello!' ) );
	const vdom$ = view( state$ )

	return {
		DOM: vdom$,
		LOG: response$
	};
}
