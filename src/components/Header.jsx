import React from 'react';

/**
 * Reusable header component for section titles.
 * @param {object} props
 * @param {string} props.title - The title of the section.
 * @param {React.Component} props.icon - The Lucide icon component.
 */
const StudentHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
        <div className="bg-[#111827] p-3 rounded-xl">
            <Icon className="w-6 h-6 text-indigo-300" />
        </div>
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
    </div>
);

export default StudentHeader;