import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from 'graphql-hooks';

const LOGIN_QUERY = `query { login { email: $email, password: $password } }`


const useStyles = makeStyles(theme => ({
	  container: {
		      display: 'flex',
		      flexWrap: 'wrap',
		    },
	  textField: {
		      width: 200,
		    },
	  dense: {
		      marginTop: 19,
		    },
	  menu: {
		      width: 200,
		    },
}));
function Login() {
  const classes = useStyles();
  const [values, setValues] = React.useState({ email: '', password: '' });

  const handleChange = name => (event) => { setValues({ ...values, [name]: event.target.value }); };


  const submitForm = () => {
	  const { loading, error, data } = useQuery(LOGIN_QUERY, { variables: { email: values.email, password: values.password } });

	  alert(data);
  };
  return (
    <form onSubmit={submitForm}>

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
      <br />

      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        InputLabelProps={{ shrink: true, }}
	required
      />
      <br />

      <Button variant="contained" color="secondary" type="submit">
Log In
      </Button>
    </form>
  );
}
/*
Login.propTypes = {
	  classes: PropTypes.object.isRequired,
};
*/
export default Login;
