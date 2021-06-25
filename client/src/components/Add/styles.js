import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    button: {
        bottom: '50px',
        position: 'sticky',
        margin: '0 auto',
        display: 'flex',
        borderRadius: '15px 15px 15px 15px',
        background: '#FF9900',
        fontWeight: 'bold',
        padding: '7px 40px',
        lineHeight: '2.5',
        '&:hover': {
            background: '#cb7a00',
        },
    },
}));
