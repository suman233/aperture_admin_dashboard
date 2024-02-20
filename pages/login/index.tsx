/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
// import Stepper from "@/components/Stepper/StepperComp";
import { loginFunction } from "@/api/functions/user.api";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import validationText from "@/json/messages/validationText";
import Wrapper from "@/layout/wrapper/Wrapper";
import { setCookieClient } from "@/lib/functions/storage.lib";
// import { setCookieClient } from "@/lib/functions/storage.lib";
// import { setLoginData } from "@/reduxtoolkit/slices/userSlice";
import styles from "@/styles/pages/register.module.scss";
import CustomButton from "@/ui/Buttons/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";






interface StepProps {
  handleNext?: () => void;
  handleBack?: () => void;
  handleReset?: () => void;
}


// interface signUpData {
//   message: string;
//   status?: Number;
//   type?: string;
//   error?: {
//     status?: Number;
//     errorType?: string;
//   };
//   data: userData;
//   token: string;
// }

const schema = yup.object().shape({
  user: yup
    .string()
    .trim()
    .email(validationText.error.email_format)
    .required(validationText.error.enter_email),
  password: yup.string().trim().required(validationText.error.enter_password),
});




const Index = () => {
  const router = useRouter()
  //   const [phone, setPhone] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const {
    handleSubmit,
    control,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const dispatch = useAppDispatch()


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { mutate } = useMutation('login', loginFunction)

  const onSubmit: SubmitHandler<> = (data) => {
    mutate(
      data,
      {
        onSuccess: (data) => {
          if (data.user) {
            setCookieClient('userdata', data?.jwt)
            router.push('/my-profile')
          }
          // if (data?.status === 200) {
          //   // toastSuccess(data?.message);
          //   dispatch(setLoginData(data?.data));
          //   setCookieClient("future_pedia_token", data?.token);
          //   setCookieClient("user", JSON.stringify(data.data));
          //   router.replace("/");
          // } else {
          //   console.log(data?.message);
          // }
        },
      }
    );
  };




  return (
    <Wrapper>
      <Box className={`cmn_gap ${styles.register_page}`} >
        <Container fixed >
          <Box className={styles.main_wrap} display='flex' justifyContent='center'>

            <Box component='form' onSubmit={handleSubmit(onSubmit)} className={styles.right_wrap}>
              <Paper elevation={10} className={styles.paper_area}>
                <Box className={styles.paper_head}>
                  <Typography variant="h2">Login </Typography>
                  <Typography variant="body1">
                    Please enter your email and password.{" "}
                  </Typography>
                </Box>
                <Box className={`${styles.paper_body} ${styles.step_one_body}`}>
                  <Grid container columnSpacing={4} rowSpacing={3}>

                    <Grid item md={12} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                        className={styles.form_field}
                        {...register('user')}
                        name="user"
                        helperText={errors?.email?.message || ""}
                        error={Boolean(errors?.email)}
                      />
                    </Grid>


                    <Grid item md={12} sm={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        className={styles.form_field}
                        {...register('password')}
                        helperText={errors?.password?.message || ""}
                        error={Boolean(errors?.password)}
                      />
                    </Grid>
                  </Grid>



                </Box>
                <Box className={`${styles.paper_footer} ${styles.first_foot}`}>
                  <CustomButton type="submit">
                    <Typography variant="button">Login</Typography>
                  </CustomButton>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default Index;
