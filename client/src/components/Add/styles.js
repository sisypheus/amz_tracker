import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        bottom: '50px',
        position: 'sticky',
        margin: '0 auto',
        borderRadius: '15px 15px 15px 15px',
        background: '#FF9900 !important',
        fontWeight: 'bold',
        padding: '7px 40px',
        lineHeight: '2.5',
        '&:hover': {
            background: '#cb7a00 !important',
        },
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: '50px',
        left:'50%',
        transform: 'translate(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    }
}, {index: 1});

export default useStyles;
