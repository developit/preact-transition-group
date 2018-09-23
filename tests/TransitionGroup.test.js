import { h, Component, render } from 'preact';
import TransitionGroup from '../src';

/* global describe,expect,it,spyOn */

class Todo extends Component {
	componentWillEnter(done) {
		setTimeout(done, 20);
	}
	componentDidEnter() {}

	componentWillLeave(done) {
		setTimeout(done, 20);
	}
	componentDidLeave() {}

	render({ onClick, children }) {
		return <div onClick={onClick} class="item">{children}</div>;
	}
}

class TodoList extends Component {
	state = {
		items: ['hello', 'world', 'click', 'me']
	};

	handleAdd(item) {
		let { items } = this.state;
		items = items.concat(item);
		this.setState({ items });
	}

	handleRemove(i) {
		let { items } = this.state;
		items.splice(i, 1);
		this.setState({ items });
	}

	render(_, { items }) {
		return (
			<div>
				<TransitionGroup>
					{ items.map( (item, i) => (
						<Todo key={item} onClick={this.handleRemove.bind(this, i)}>
							{item}
						</Todo>
					)) }
				</TransitionGroup>
			</div>
		);
	}
}


const Nothing = () => null;


describe('TransitionGroup', () => {
	let container = document.createElement('div'),
		list, root;
	document.body.appendChild(container);

	/** @type {(selector: string) => Element[]} */
	let $ = s => [].slice.call(container.querySelectorAll(s));

	beforeEach( () => {
		root = render(<TodoList ref={c => list=c} />, container, root);
	});

	afterEach( () => {
		list = null;
		root = render(<Nothing />, container, root);
	});

	it('create works', () => {
		expect($('.item').length).toEqual(4);
	});

	it('enter works', done => {
		spyOn(Todo.prototype, 'componentWillEnter').and.callThrough();
		spyOn(Todo.prototype, 'componentDidEnter').and.callThrough();

		list.handleAdd('foo');
		// rerender();

		setTimeout( () => {
			expect($('.item').length).toEqual(5);
		});

		setTimeout( () => {
			expect($('.item').length).toEqual(5);
			expect(Todo.prototype.componentDidEnter).toHaveBeenCalledTimes(1);
			done();
		}, 40);
	});

	it('leave works', done => {
		spyOn(Todo.prototype, 'componentWillLeave').and.callThrough();
		spyOn(Todo.prototype, 'componentDidLeave').and.callThrough();

		list.handleRemove(0);
		// rerender();

		// make sure -leave class was added
		setTimeout( () => {
			expect($('.item').length).toEqual(4);
		});

		// then make sure it's gone
		setTimeout( () => {
			expect($('.item').length).toEqual(3);
			expect(Todo.prototype.componentDidLeave).toHaveBeenCalledTimes(1);
			done();
		}, 40);
	});

	// it('transitionLeave works', done => {
	// 	// this.timeout(5999);
	// 	list.handleAdd(Date.now());
	//
	// 	setTimeout( () => {
	// 		expect($('.item')).to.have.length(5);
	//
	// 		expect($('.item')[0].className).to.contain('example-enter');
	// 		expect($('.item')[0].className).to.contain('example-enter-active');
	// 	}, 100);
	//
	// 	setTimeout( () => {
	// 		expect($('.item')).to.have.length(5);
	//
	// 		expect($('.item')[0].className).not.to.contain('example-enter');
	// 		expect($('.item')[0].className).not.to.contain('example-enter-active');
	//
	// 		done();
	// 	}, 1400);
	// });
});
