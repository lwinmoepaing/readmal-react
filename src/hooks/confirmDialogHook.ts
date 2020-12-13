import { useState, useEffect, useCallback } from 'react' 

export interface ConfirmDialogHook {
    isConfirm: boolean,
    isOpenConfirmDialog: boolean
    confirmDialogTitle: string
    confirmDialogDescription: string

    openConfirmDialog: () => void
    setConfirmDialogText: (title: string, description: string) => void
    onConfirmSubmit: (fn?: (isConfirm: boolean) => void) => void
    handleIsConfirm: (confimValue: boolean) => void
}

export default function confirmDialogHook (initTitle: string = 'Default Title', initDescriptio: string = 'Default Description' ): ConfirmDialogHook {
    
    const [isOpenConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false)

    const [isConfirm, setIsConfirm] = useState<boolean>(false)
    const [confirmDialogTitle, setConfirmDialogTitle] = useState<string>(initTitle)
    const [confirmDialogDescription, setConfirmDialogDescription] = useState<string>(initDescriptio)
  
    const openConfirmDialog = () => {
      setOpenConfirmDialog(true)
    };
  
    const onConfirmSubmit = useCallback((callBack?: (isAgree: boolean) => void) => {
        setIsConfirm(true)
        if (callBack) callBack(true)
        setOpenConfirmDialog(false)
        
    }, [isConfirm])

    const handleIsConfirm = useCallback((confimValue: boolean) => {
        setIsConfirm(confimValue)
        setOpenConfirmDialog(false);
    }, [isConfirm])

    const setConfirmDialogText = useCallback((title: string, description: string = '') => {
        setConfirmDialogTitle(title)
        setConfirmDialogDescription(description)
    }, [confirmDialogTitle, confirmDialogDescription])

    return {
        isConfirm,
        isOpenConfirmDialog,
        confirmDialogTitle,
        confirmDialogDescription,
        // All Methods
        openConfirmDialog,
        setConfirmDialogText,
        onConfirmSubmit,
        handleIsConfirm
    }
}