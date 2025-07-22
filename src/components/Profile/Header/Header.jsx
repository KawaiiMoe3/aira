import React from 'react'
import Avatar from './Avatar'
import UserInfo from './UserInfo'

export default function Header() {
    return (
        <div className="bg-gradient-to-r from-[#8741eb] to-[#5b4be7] animate-gradient text-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center">
                <Avatar />
                <UserInfo />
            </div>
        </div>
    )
}
