import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'


const customAvatar = '/img/avatars/thumb-1.jpg';



export const UserDropdown = ({ className }) => {
    const {userName, email } = useSelector(
        (state) => state.auth.user
    )

    const { signOut } = useAuth()

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
        <Avatar size={32} shape="circle" src={customAvatar} />
        
    </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                    <Avatar size={32} shape="circle" src={customAvatar} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userName}
                            </div>
                            <div className="text-xs">{email}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOut}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)
