import React    from 'react';
import Keyboard from 'components/Keyboard';
import Legend   from 'components/Legend';

import {
	Button,
	Select,
	Radio,
	Radios,
	Checkbox,
	Checkboxes
} from 'components/Form';

const Home = () => (
	<div>
		<Select name="foobar" defaultValue="baz" options={[
			{ label: 'foo', value: 'bar' },
			{ label: 'bar', value: 'baz' },
			{ label: 'baz', value: 'foo' },
			{ label: 'foobar', value: 'foo' },
		]} />

		<Checkboxes name="test" data={[
			{ label: 'test1', value: '1' },
			{ label: 'test2', value: '2' },
			{ label: 'test3', value: '3' },
		]} />

		<Radio name="foo" value="bar" label="foobar" />
		<Checkbox name="foo" value="bar" label="foobar" />

		<Legend />
		<Keyboard />
	</div>
);

export default Home;
