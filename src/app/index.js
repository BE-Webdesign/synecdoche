import xs from 'xstream';
import { run } from '@cycle/run';
import { h, div, button, p, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

const postsEndpoint = 'http://local.wordpress.test/wp-json/wp/v2/posts';

function posts( posts ) {
	return h(
		'div',
		{ class: { posts: true } },
		posts.map( post => h( 'div', { class: { post: true } }, [ post.title.rendered ] ) )
	)
}

function model( posts$ ) {
	return posts$.map( posts => ({ posts }) )
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

function main(sources) {
	const request$ = xs.of( {
		url: postsEndpoint, // GET method by default
		category: 'posts',
	} )

	const response$ = sources.HTTP
		.select('posts')
		.flatten()
		.map( res => res.body )
		.startWith( [ { title: { rendered: 'Test'} } ] )

	const state$ = model( response$ )

	const vdom$ = view( state$ )

	return {
		DOM: vdom$,
		HTTP: request$,
	};
}

export default function app( sources ) {
	const vdom$ = xs.of( h( 'div', 'Hello World!' ) );

	return {
		DOM: vdom$
	};
}
