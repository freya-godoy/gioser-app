import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 260;

const styles = theme => ({
    root: {
        display: 'flex',
        height: 40
    },
    appBar: {
        zIndex: 501,
        backgroundColor: 'var(--black) !important',
        zDepthShadows: 'none'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
        color: 'var(--black) !important'
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: 'rotate(0deg)'
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: 'rotate(180deg)'
    },
    menuItem: {
        fontSize: 14
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        zIndex: 500
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1.2,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1.2
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 0,
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: 'auto'
    },
    nested: {
        paddingLeft: theme.spacing(2.5)
    },
    toolbarComponent: {
        minHeight: 50
    }
});

export default makeStyles(styles);
