import { forwardRef } from 'react'
import { useAuth } from "../../services/AuthContext";
import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {

    const auth = useAuth();
    return (
        <>
            {auth.notification && (
                <Snackbar open={true} autoHideDuration={3000} >
                    <Alert severity={auth.notification.status} sx={{ width: '100%' }}>
                        {auth.notification.message}
                    </Alert>
                </Snackbar>
            )}
            {auth.loading && (

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress />
                </Backdrop>
            )}

        </>
    )

}



export default Notification;