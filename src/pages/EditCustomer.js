import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import { firebaseCrear } from 'src/utils/Firebase.util';

const EditCustomer = () => {
    const navigate = useNavigate();

    const CrearCliente = (cliente) => {
        firebaseCrear("clientes",cliente);
        //e.preventDefault();
      };

    return (
        <>
            <Helmet>
                <title>Registrar cliente</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: '',
                            phone: '',
                            firstName: '',
                            lastName: ''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                                firstName: Yup.string().max(255).required('First name is required'),
                                lastName: Yup.string().max(255).required('Last name is required')
                            })
                        }
                        onSubmit={(usuario) => {
                            CrearCliente(usuario);
                            navigate('/app/dashboard', { replace: true });
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Crear cliente
                                    </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    fullWidth
                                    helperText={touched.firstName && errors.firstName}
                                    label="First name"
                                    margin="normal"
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    fullWidth
                                    helperText={touched.lastName && errors.lastName}
                                    label="Last name"
                                    margin="normal"
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(touched.phone && errors.phone)}
                                    fullWidth
                                    helperText={touched.phone && errors.phone}
                                    label="Telefono"
                                    margin="normal"
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    variant="outlined"
                                />


                                <Box sx={{ py: 2 }}>
                                    <Button

                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign up now
                                    </Button>
                                </Box>

                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default EditCustomer;
