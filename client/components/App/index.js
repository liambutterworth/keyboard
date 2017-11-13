import React      from 'react';
import PropTypes  from 'prop-types';
import ClassNames from 'classnames';

require( './style.css' );

class App extends React.Component {
	componentWillMount() {
		this.state = {
			isNormalMode: this.props.defaultMode === 'NORMAL',
			isInputMode:  this.props.defaultMode === 'INPUT',
		};

		window.mode = this.props.defaultMode;
	}

	componentDidMount() {
		document.addEventListener( 'keydown', this.handleKeydown.bind( this ) );
	}

	handleKeydown( event ) {
		if ( event.keyCode === this.props.toggleKeyCode ) {
			if ( window.mode === 'NORMAL' ) {
				window.mode = 'INPUT';

				this.setState( {
					isNormalMode: false,
					isInputMode:  true,
				} );
			} else {
				window.mode = 'NORMAL';

				this.setState( {
					isNormalMode: true,
					isInputMode:  false,
				} );
			}
		}
	}

	render() {
		const classNames = ClassNames( {
			'mode--normal': this.state.isNormalMode,
			'mode--input':  this.state.isInputMode,
		} );

		return (
			<div id="app" className={ classNames }>
				{ this.props.children }
			</div>
		);
	}
}

App.defaultProps = {
	toggleKeyCode: 32, // space
	defaultMode:   'INPUT',
};

App.propTypes = {
	toggleKeyCode: PropTypes.number,
	defaultMode:   PropTypes.string,
	children:      PropTypes.node.isRequired,
};

export default App;
