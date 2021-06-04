import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        marginBottom: '5px',
        color: 'rgba(228, 121, 17, 1)',
    },
    image: {
        marginLeft: '15px',
    },
}));