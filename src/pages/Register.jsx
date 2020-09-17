import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';

function Register() {
	  const [values, setValues] = React.useState({ email: '', password: '', passwordconfirm: '' });

	  const handleChange = name => (event) => { setValues({ ...values, [name]: event.target.value }); };


	return (
  <form onSubmit={() => {}}>
		<TextField
		        autoFocus
		        fullWidth
		        value={values.email}
		        onChange={handleChange('email')}
		        id="email"
		        label="Email Address"
		        placeholder="Email Address"
		        margin="normal"
		        InputLabelProps={{shrink: true,}}
		        required
		      />
		<TextField
		        autoFocus
		        fullWidth
		        value={values.password}
		        onChange={handleChange('password')}
		        id="password"
		        label="Password"
		        placeholder="Password"
			type="password"
		        margin="normal"
		        InputLabelProps={{shrink: true,}}
		        required
		      />
		<TextField
		        autoFocus
		        fullWidth
		        value={values.passwordconfirm}
		        onChange={handleChange('passwordconfirm')}
		        id="passwordconfirm"
		        label="Confirm Password"
		        placeholder="Confirm Password"
			type="password"
		        margin="normal"
		        InputLabelProps={{shrink: true,}}
		        required
			error={values.password!=="a"}
		      />
    <br />

    <Button variant="contained" color="secondary" type="submit">
Register
    </Button>
  </form>
);

}
export default Register
