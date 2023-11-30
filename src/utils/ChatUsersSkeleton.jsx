import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';

export default function ChatUsersSkeleton() {
    const numberOfChatBubbles = 22;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Stack spacing={2} className='py-4'>
                {Array.from({ length: numberOfChatBubbles }).map((_, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        className={`flex items-center justify-start`}
                    >
                        <Skeleton variant="circular" width={60} height={60} className='rounded-xl' />
                        <Skeleton variant="rectangular" width={'80%'} height={60} className='rounded-xl' />
                    </Stack>
                ))}
            </Stack>
        </motion.div>
    );
}
