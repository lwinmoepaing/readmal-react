import React, {useEffect, useState} from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { State } from '../../../store/configStore';
import { useSelector } from 'react-redux';

function MyApp() {
  const snack = useSelector((state: State) => state?.Snackbar)

  const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   enqueueSnackbar('I love snacks.', {
  //     autoHideDuration: 1000
  //   });
  // };

  useEffect(() => {
    snack.messages.map(mes => {
      enqueueSnackbar(mes.message, {
        variant: mes.variant,
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
      },
      });
    })
  }, [snack.messages])

  // const handleClickVariant = (variant: VariantType) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', {
  //     variant,
  //     autoHideDuration: 1000
  //   });
  // };

  return (
    <>
    </>
  );
}

export default function SnackBar() {
  return (
    <SnackbarProvider maxSnack={6}>
      <MyApp />
    </SnackbarProvider>
  );
}
