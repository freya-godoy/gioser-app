import AddBoxIcon from '@mui/icons-material/AddBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import has from 'lodash/has';
import pick from 'lodash/pick';
import { getRoutes } from '@helpers';

export const getI18N = state => get(state, 'session.i18n');

export const getIsMobile = state => get(state, 'session.isMobile');

export const lookUP = ({ state, path }) => {
    if (has(state, path)) {
        return get(state, path);
    }
    return null;
};

export const getForm = state => get(state, 'session.form');
export const getFlagData = state => pick(get(state, 'session'), ['flagData', 'type']);
export const isAuthenticate = state => get(state, 'session.isAuthenticate');
export const getSessionUser = state => get(state, 'session');
export const getSessionUserId = state => get(state, 'session.id');
export const getGlobalModalProps = () => state => get(state, 'session.globalModal');
export const getModalData = state => get(state, 'session.modal');
export const getAvatar = state => get(state, 'session.avatar');
export const getStatusMessage = state => pick(get(state, 'session'), ['status', 'message']);
export const getVerifyTokenPasswordConfirm = state => get(state, 'session.verifyTokenPasswordConfirm');
export const getPersonActivate = state => get(state, 'session.personActivate');
const productRoutes = getRoutes('product');
const orderRoutes = getRoutes('order');
// eslint-disable-next-line no-unused-vars
export const getSideNavigation = () => state => {
    // const i18n = getI18N(state);
    const menus = [
        {
            label: 'Productos',
            key: 'products',
            ab: 'products',
            icon: InventoryIcon,
            actions: [
                {
                    label: 'Lista de Productos',
                    icon: FormatListBulletedIcon,
                    to: productRoutes.list
                },
                {
                    label: 'Nuevo Producto',
                    icon: AddBoxIcon,
                    to: productRoutes.form
                }
            ]
        },
        {
            label: 'Pedidos',
            key: 'order',
            ab: 'order',
            icon: ForwardToInboxIcon,
            actions: [
                {
                    label: 'Lista de Pedidos',
                    icon: FormatListBulletedIcon,
                    to: orderRoutes.list
                },
                {
                    label: 'Nuevo Pedido',
                    icon: AddBoxIcon,
                    to: orderRoutes.form
                },
                {
                    label: 'Pedido Modo Cliente',
                    icon: AddBoxIcon,
                    to: orderRoutes.view
                }
            ]
        }
    ];

    const menuDown = [
    ];

    return {
        sideMenu: cloneDeep(menus), menuDown
    };
};

export const getRecaptchaItem = () => state => get(state, 'session.reCaptcha', {
    item: null, token: null
});
