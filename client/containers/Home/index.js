import React    from 'react';
import Keyboard from 'components/Keyboard';
import Legend   from 'components/Legend';

import {
	Button,
	Select
} from 'components/Form';

const Home = () => (
	<div>
		{/*
		<Select name="foobar" selected="baz" options={{ foo: 'bar', bar: 'baz', baz: 'foo', group: { foobar: 'one', barbaz: 'two' } }} />
		*/}

		<Select name="foobar" selected="baz" options={[
			{ label: 'foo', value: 'bar' }
			{ label: 'bar', value: 'baz' }
			{ label: 'baz', value: 'foo' }
		]} />

		<Legend />
		<Keyboard />
	</div>
);

export default Home;
