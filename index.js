'use strict';

import { createStore } from 'redux'

let items = [
	'Angular',
	'React',
	'Backbone',
	'Ember',
	'Knockout'
];

let handler = function (state = items, action) {

	switch (action.type) {
		case 'GET_ALL':
			return state;
		case 'ADD':
			return [...state, action.item];
		case 'EDIT':
			state[action.id] = action.item;
			return state;
		case 'DELETE':
			state.splice(action.id, 1);
			return state;
		default:
			return state
	}
};

let store = createStore(handler);

window.manager = {
	getAll: function () {

		let $collection = $('.collection'),
			items = store.getState(),
			tpl = $('#itemTpl').html(),
			html = '';

		$collection.html('');

		$.each(items, function (id, item) {

			html = tpl
					.split('{id}').join(id)
					.split('{item}').join(item);

			$collection.append(html);
		});
	},
	save: function (obj) {

		let $input = $(obj).find('input'),
			val = $input.val().trim(),
			id = $input.attr('data-id');

		if(!val.length) {
			return false;
		}

		if(!!id){
			store.dispatch({type: 'EDIT', item: val, id: id});
		} else {
			store.dispatch({type: 'ADD', item: val});
		}

		$input.removeAttr('data-id');
		$input.val('');

		$('.collection-item').removeClass('active');
		return false;
	},
	edit: function (obj) {

		let $item = $(obj).closest('li'),
			id = $item.attr('data-id'),
			text = $item.find('span').text();

		$('.collection-item').removeClass('active');
		$item.addClass('active');

		$('#input').val(text).attr('data-id', id).focus();
	},
	delete: function (id) {
		$('#input').val('');
		store.dispatch({type: 'DELETE', id: id});
	},
	init: function () {
		store.subscribe(this.getAll);
		store.dispatch({type: 'GET_ALL'});
	}
};

window.manager.init();