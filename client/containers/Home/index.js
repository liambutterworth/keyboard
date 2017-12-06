import React    from 'react';
import Keyboard from 'components/Keyboard';
import Legend   from 'components/Legend';

import ScaleSelector from 'components/ScaleSelector';

function foo( scale ) {
	console.log( scale );
}

const Home = () => (
	<div>
		<ScaleSelector set={ foo } />

		<Legend />
		<Keyboard />
	</div>
);

export default Home;
