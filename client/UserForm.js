import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import styles from './UserForm.css';

class UserForm extends Component {
	constructor(props){
		super(props);
		this.state = {name: ''};
	}

	handelSubmit(e) {
		e.preventDefault();
		this.porps.onUserSubmit(this.state.name);
	}

	handleChange(e) {
		this.setState({name: e.target.value});
	}

	render() {
		return(
			<form className={styles.UserForm} onSubmit={e = this.handelSubmit(e)}>
				<input
					className={styles.UserInput}
					placeholder='Write your nickname and press enter'
					onChange={e => this.handleChange(e)}
					value={this.state.name}
				/>
			</form>
			);
	}
}

export default UserForm;