import { useToast } from '@chakra-ui/react';

type inputToastParams = {
    title: string;
    description: string;
};

export const useAlertToast = () => {
    const toast = useToast();

    const successToast = (toastInput: inputToastParams) => {
        return toast({
            title: toastInput.title,
            description: toastInput.description,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            variant: 'left-accent'
        });
    };

    const infoToast = (toastInput: inputToastParams) => {
        return toast({
            title: toastInput.title,
            description: toastInput.description,
            status: 'info',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            variant: 'left-accent'
        });
    };

    const errorToast = (toastInput: inputToastParams) => {
        return toast({
            title: toastInput.title,
            description: toastInput.description,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            variant: 'left-accent'
        });
    };

    return {
        toast,
        successToast,
        infoToast,
        errorToast
    };
};
