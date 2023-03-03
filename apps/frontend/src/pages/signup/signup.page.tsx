import React, { FC } from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Container, 
  FormControl,
  FormHelperText,
  Grid, 
  TextField, 
  Typography 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import RouterSuspense from '../../components/router-suspense/router-suspense.component';
import { SignUpDto } from '@boilerplate/shared';
import { useSignUpMutation } from '@boilerplate/store';
import { contentStyle, errorStyle } from './signup.styles';


const resolver = classValidatorResolver(SignUpDto);

const SignUpPage: FC = () => {
  const { 
    handleSubmit, 
    register, 
    formState: { errors } 
  } = useForm<SignUpDto>({ resolver });

  const [signUp, { isLoading }] = useSignUpMutation();

  const onConfirm = async (): Promise<void> => {
    await handleSubmit(
      async value => {
        try {
          await signUp(value);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onConfirm)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} position="relative">
              <FormControl>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  autoComplete="given-name"
                  autoFocus
                  error={!!errors.name}
                  aria-describedby="component-error-name"
                  {...register('name')}
                />
                <FormHelperText error id="component-error-name" sx={errorStyle}>
                  {errors.name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} position="relative">
              <FormControl>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  aria-describedby="component-error-lastname"
                  {...register('lastName')}
                />
                <FormHelperText error id="component-error-lastname" sx={errorStyle}>
                  {errors.lastName?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={4} mb={4} position="relative">
              <FormControl fullWidth>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  aria-describedby="component-error-email"
                  {...register('email')}
                />
                <FormHelperText error id="component-error-email" sx={errorStyle}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} mb={4} position="relative">
              <FormControl fullWidth>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  autoComplete="new-password"
                  type="password"
                  error={!!errors.password}
                  aria-describedby="component-error-password"
                  {...register('password')}
                />
                <FormHelperText error id="component-error-password" sx={errorStyle}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={'/login'}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpPage;
