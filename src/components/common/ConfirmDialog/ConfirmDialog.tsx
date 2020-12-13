import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Button, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import { ConfirmDialogHook } from '../../../hooks/confirmDialogHook'

export interface ConfirmDialogProps {
    confirmDialogHook: ConfirmDialogHook
    onConfirm: (isAgree: boolean) => void
}

export default function ConfirmDialog({confirmDialogHook, onConfirm}: ConfirmDialogProps): JSX.Element {
    const {
        isConfirm,
        isOpenConfirmDialog,
        confirmDialogDescription,
        confirmDialogTitle,
        // All Methods
        onConfirmSubmit,
        handleIsConfirm
      } = confirmDialogHook
    
  return (
    <Dialog aria-labelledby="Confirm-Dialog" open={isOpenConfirmDialog} fullWidth>
        <DialogTitle id="Confirm-Dialog">{ confirmDialogTitle }</DialogTitle>
        <DialogContent>
            <DialogContentText>
                { confirmDialogDescription }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="default" variant="outlined" fullWidth={true} onClick={() => handleIsConfirm(false)}>
                မလုပ်ဆောင်ပါ
            </Button>
            <Button color="primary" variant="contained" fullWidth={true} onClick={() => onConfirmSubmit(onConfirm) }>
                လုပ်ဆောင်မည်
            </Button>
        </DialogActions>
    </Dialog>
  );
}
