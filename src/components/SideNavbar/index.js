import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {isMobile} from 'react-device-detect';
import logo from 'images/OKLAHOMA-V2-1.png';
import map from 'lodash/map';
import fromState from '@selectors';
import {getRoutes} from '@helpers';
import isEmpty from 'lodash/isEmpty';
import useStyles from './style';

const routes = getRoutes('mainRoutes');

const TooltipModified = withStyles(() => ({
    tooltip: {
        fontSize: 15
    }
}))(Tooltip);

const SideNavbar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState('');
    const history = useHistory();

    const handleMenu = value => setMenuOpen(value !== menuOpen ? value : '');

    const {sideMenu, menuDown} = useSelector(state => fromState.Session.getSideNavigation()(state));
    const handleRedirect = route => {
        handleMenu('');
        history.push(route);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classes.appBar}
                fooJon={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                elevation={0}

            >
                <Toolbar disableGutters className={classNames(classes.toolbarComponent, 'my-auto')}>
                    <div className="row w-100">
                        {isMobile
                         && (
                             <>
                                 <div className="col align-self-end">
                                     <IconButton
                                         color="warning"
                                         aria-label="Open drawer"
                                         onClick={() => setOpen(!open)}
                                         className={classes.menuButton}
                                     >
                                         <MenuIcon
                                             classes={{
                                                 root: open
                                                     ? classes.menuButtonIconOpen
                                                     : classes.menuButtonIconClosed
                                             }}
                                             fontSize="large"
                                             style={{
                                                 maxWidth: '30px',
                                                 color: '#FBAF40'
                                             }}
                                         />
                                     </IconButton>
                                 </div>
                                 <div className="col align-self-end">
                                     <div
                                         tabIndex={0}
                                         onKeyDown={() => handleRedirect(routes.home)}
                                         role="button"
                                         onClick={() => handleRedirect(routes.home)}
                                     >
                                         <img src={logo} alt="logo-app" className="p-1" height={55}/>
                                     </div>
                                 </div>

                             </>
                         )}
                        {!isMobile && (
                            <div className="col align-self-start">
                                <div
                                    tabIndex={0}
                                    onKeyDown={() => handleRedirect('/')}
                                    role="button"
                                    onClick={() => handleRedirect('/')}
                                >
                                    <img src={logo} alt="logo-app" className="p-1" width={90} height={55}/>
                                </div>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            {!isMobile && (
                <Drawer
                    position="fixed"
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}/>
                    {!isMobile && (
                        <IconButton
                            color="warning"
                            aria-label="Open drawer"
                            onClick={() => setOpen(!open)}
                            className={classes.menuButton}
                            style={{
                                maxWidth: '30px',
                                color: 'yellow'
                            }}
                        >
                            <MenuIcon
                                classes={{
                                    root: open
                                        ? classes.menuButtonIconOpen
                                        : classes.menuButtonIconClosed
                                }}
                                className="text-dark"
                                style={{
                                    maxWidth: '30px',
                                    color: 'yellow'
                                }}
                            />
                        </IconButton>
                    )}
                    {map(sideMenu, menu => {
                        const InnerMenuIcon = menu.icon;
                        return (
                            <>
                                <TooltipModified
                                    title={menu.label}
                                    arrow
                                    placement="right"
                                >
                                    <ListItem button onClick={!isEmpty(menu.to) ? () => handleRedirect(menu.to) : () => handleMenu(menu.key)}>
                                        <ListItemIcon title={menu.ab}>
                                            <InnerMenuIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={menu.label}/>
                                        {!isEmpty(menu.actions) && (
                                            <>
                                                {menuOpen === menu.key && <ExpandLess/> }
                                                {menuOpen !== menu.key && <ExpandMore/>}
                                            </>
                                        )}
                                    </ListItem>
                                </TooltipModified>
                                <Collapse in={menuOpen === menu.key} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {map(menu.actions, actions => {
                                            const Icon = actions.icon;
                                            return (
                                                <TooltipModified
                                                    title={actions.label}
                                                    arrow
                                                    placement="right"
                                                >
                                                    <ListItem
                                                        button
                                                        className={classes.nested}
                                                        onClick={() => history.push(actions.to)}
                                                        title={actions.label}
                                                    >
                                                        <ListItemIcon>
                                                            <Icon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={actions.label}/>
                                                    </ListItem>
                                                </TooltipModified>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                                <Divider/>
                            </>
                        );
                    })}
                    <div
                        className="align-self-end"
                        style={{
                            bottom: 0, position: 'absolute', width: '100%'
                        }}
                    >
                        {map(menuDown, menu => {
                            const InnerMenuIcon = menu.icon;
                            return (
                                <>
                                    <TooltipModified
                                        title={menu.label}
                                        arrow
                                        placement="right"
                                    >
                                        <ListItem button onClick={menu.onAction ? () => menu.onAction() : () => handleRedirect(menu.to)}>
                                            <ListItemIcon title={menu.ab}>
                                                <InnerMenuIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={menu.label}/>
                                        </ListItem>
                                    </TooltipModified>
                                    <Divider/>
                                </>
                            );
                        })}
                    </div>
                </Drawer>
            )}
            {isMobile
                && open
                    && (
                        <Drawer
                            position="fixed"
                            variant="permanent"
                            className={classNames(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })}
                            classes={{
                                paper: classNames({
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open
                                })
                            }}
                            open={open}
                        >
                            <div className={classes.toolbar}/>
                            {map(sideMenu, menu => {
                                const InnerMenuIcon = menu.icon;
                                return (
                                    <>
                                        <TooltipModified
                                            title={menu.label}
                                            arrow
                                            placement="right"
                                        >
                                            <ListItem
                                                button
                                                onClick={!isEmpty(menu.to) ? () => handleRedirect(menu.to) : () => handleMenu(menu.key)}
                                            >
                                                <ListItemIcon title={menu.ab}>
                                                    <InnerMenuIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={menu.label}/>
                                                {!isEmpty(menu.actions) && (
                                                    <>
                                                        {menuOpen === menu.key && <ExpandLess/> }
                                                        {menuOpen !== menu.key && <ExpandMore/>}
                                                    </>
                                                )}
                                            </ListItem>
                                        </TooltipModified>
                                        <Collapse in={menuOpen === menu.key} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {map(menu.actions, actions => {
                                                    const Icon = actions.icon;
                                                    return (
                                                        <TooltipModified
                                                            title={actions.label}
                                                            arrow
                                                            placement="right"
                                                        >
                                                            <ListItem
                                                                button
                                                                className={classes.nested}
                                                                onClick={() => history.push(actions.to)}
                                                                title={actions.label}
                                                            >
                                                                <ListItemIcon>
                                                                    <Icon/>
                                                                </ListItemIcon>
                                                                <ListItemText primary={actions.label}/>
                                                            </ListItem>
                                                        </TooltipModified>
                                                    );
                                                })}
                                            </List>
                                        </Collapse>
                                        <Divider/>
                                    </>
                                );
                            })}
                            <div
                                className="align-self-end"
                                style={{
                                    bottom: 0, position: 'absolute', width: '100%'
                                }}
                            >
                                {map(menuDown, menu => {
                                    const InnerMenuIcon = menu.icon;
                                    return (
                                        <>
                                            <TooltipModified
                                                title={menu.label}
                                                arrow
                                                placement="right"
                                            >
                                                <ListItem
                                                    button
                                                    onClick={menu.onAction ? () => menu.onAction() : () => handleRedirect(menu.to)}
                                                >
                                                    <ListItemIcon title={menu.ab}>
                                                        <InnerMenuIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={menu.label}/>
                                                </ListItem>
                                            </TooltipModified>
                                            <Divider/>
                                        </>
                                    );
                                })}
                            </div>
                        </Drawer>
                    )}
        </div>
    );
};

export default SideNavbar;
