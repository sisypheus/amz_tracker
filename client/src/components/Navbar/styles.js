import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    heading: {
        marginBottom: '5px',
        color: 'rgba(228, 121, 17, 1)',
    },
    image: {
        marginLeft: '15px',
        paddingTop: '15px'
    },
    appBar: {
        position: 'relative',
        borderRadius: 15,
        padding: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
    },
    heading: {
        color: '#FF9900',
        textDecoration: 'none',
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
        marginRight: '20px',
    }
}));