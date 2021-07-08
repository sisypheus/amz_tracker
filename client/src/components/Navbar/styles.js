import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    heading: {
        marginTop: '10px',
        color: '#FF9900',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
        marginRight: '10px',
        paddingTop: '15px',
        height: '60px',
    },
    appBar: {
        boxSizing: 'content-box',
        position: 'relative',
        borderRadius: 15,
        padding: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    toolbar: {
        display: 'flex',
        position: 'absolute',
        right: 0,
    },
    purple: {
        marginRight: theme.spacing(2),
        height: '45px',
        width: '45px',
        '&:hover': {
            cursor: 'pointer',
        }
    }
}));