import Link from 'next/link';
import React from 'react'
import { LinkIt, LinkItUrl } from "react-linkify-it";
import UserLinkWithTooltip from './UserLinkWithTooltip';

interface LinkifyProps {
    children: React.ReactNode
}

const Linkify: React.FC<LinkifyProps> = ({ children }) => {
    return (
        <LinkifyUsername>
            <LinkifyHashtag>
                <LinkifyUrl>
                    {children}
                </LinkifyUrl>
            </LinkifyHashtag>
        </LinkifyUsername>
    )
}

export default Linkify



const LinkifyUrl: React.FC<LinkifyProps> = ({ children }) => {
    return (
        <LinkItUrl className='text-primary hover:underline'>
            {children}
        </LinkItUrl>
    );
}

const LinkifyUsername: React.FC<LinkifyProps> = ({ children }) => {
    return (
        <LinkIt
            regex={/@([a-zA-Z0-9_-]+)/}
            component={(match, key) => (
                <UserLinkWithTooltip key={key} username={match.slice(1)}>
                    {match}
                </UserLinkWithTooltip>
            )}
        >
            {children}
        </LinkIt>
    );
}


const LinkifyHashtag: React.FC<LinkifyProps> = ({ children }) => {
    return (
        <LinkIt
            regex={/#([a-zA-Z0-9]+)/}
            component={(match, key) => (
                <Link key={key} href={`/users/${match.slice(1)}`} className='text-primary hover:underline'>{match}</Link>
            )}
        >
            {children}
        </LinkIt>
    );
}

