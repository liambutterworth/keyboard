import React    from 'react';
import Keyboard from 'components/Keyboard';
import Legend   from 'components/Legend';

import ScaleSelector from 'components/ScaleSelector';
import KeySelector from 'components/KeySelector';

function foo( x ) {
	console.log( x );
}

const Home = () => (
	<div>
		<KeySelector set={ foo } />

		<Legend />
		<Keyboard />
	</div>
);

export default Home;
