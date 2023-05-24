import Contact from './Contact';
import SharedMessages from './SharedMessages';
import StarredMessages from './StarredMessages';

import { selectSidebarType } from '../../../redux/app/app.selector';
import appActionTypes from '../../../redux/app/app.types';
import { useSelector } from 'react-redux';


const Sidebar = () => {
    const sidebarType = useSelector(selectSidebarType)
    
    switch (sidebarType) {
        case appActionTypes.SIDEBAR_TYPES.CONTACT:
            return <Contact />
        case appActionTypes.SIDEBAR_TYPES.SHARED_MESSAGES:
            return <SharedMessages />
        case appActionTypes.SIDEBAR_TYPES.STARRED_MESSAGES:
            return <StarredMessages />
        default:
            break;
    }
}

export default Sidebar
