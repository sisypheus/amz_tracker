import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        bottom: '50px',
        position: 'sticky',
        borderRadius: '15px 15px 15px 15px',
        background: '#FF9900 !important',
        padding: '7px 40px',
        lineHeight: '2.5',
        '&:hover': {
            background: '#cb7a00',
        },
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: '50px',
        left:'50%',
        transform: 'translate(-50%)',
    }
}, {index: 1});

export default useStyles;
