import React, { FC } from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  FormControlLabel, 
	FormControl,
	FormHelperText,
  Grid, 
  TextField, 
  Typography 
} from '@mui/material';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RouterSuspense from '../../components/router-suspense/router-suspense.component';
import { LoginDto } from '@boilerplate/shared';
import { useLoginMutation } from '@boilerplate/store';
import { contentStyle, errorStyle } from './login.styles';


const resolver = classValidatorResolver(LoginDto);

const LoginPage: FC = () => {
  const { 
    handleSubmit, 
    register, 
    formState: { errors } 
  } = useForm<LoginDto>({ resolver });

  const [login, { isLoading }] = useLoginMutation();

  const onConfirm = async (): Promise<void> => {
    await handleSubmit(
      async value => {
        try {          
          await login(value);
        } catch (e: any) {
          console.error(e.message);
        }
      }
    )();
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoading && (
				<Box width="100%" position="absolute" top="5px" left="0">
					<RouterSuspense />
				</Box>
      )}
      <Box sx={contentStyle} >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box 
          component="form"
          onSubmit={handleSubmit(onConfirm)}
          noValidate 
          sx={{ mt: 1 }}
        >
          <FormControl fullWidth>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Email Address"
							autoComplete="email"
							autoFocus
							error={!!errors.email}
							aria-describedby="component-error-email"
							{...register('email')}
						/>
						<FormHelperText error id="component-error-email" sx={errorStyle}>
							{errors.email?.message}
						</FormHelperText>
					</FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							autoComplete="current-password"
							type="password"
              error={!!errors.password}
							aria-describedby="component-error-password"
							{...register('password')}
						/>
						<FormHelperText error id="component-error-password" sx={errorStyle}>
							{errors.password?.message}
						</FormHelperText>
					</FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={'/signup'}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
