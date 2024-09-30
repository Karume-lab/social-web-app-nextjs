"use client";
import kyInstance from '@/lib/ky';
import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react'
import { UserData } from '../lib/types';
import { HTTPError } from 'ky';
import Link from 'next/link';
import UserTooltip from './UserTooltip';


interface UserLinkWithTooltipProps extends PropsWithChildren {
    username: string,
}

const UserLinkWithTooltip: React.FC<UserLinkWithTooltipProps> = ({ children, username }) => {
    const { data } = useQuery({
        queryKey: ["user-data", username],
        queryFn: () => kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
        retry(failureCount, error) {
            if (error instanceof HTTPError && error.response.status === 404) {
                return false;
            }
            return failureCount > 3;
            staleTime: Infinity
        }
    })

    if (!data) {
        return (
            <Link href={`/users/${username}`} className='text-primary hover:underline'>
                {children}
            </Link>
        );
    }

    return (
        <UserTooltip user={data}>
            <Link href={`/users/${username}`} className='text-primary hover:underline'>
                {children}
            </Link>
        </UserTooltip>
    );
}

export default UserLinkWithTooltip
