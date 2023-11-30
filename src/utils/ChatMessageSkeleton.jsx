import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';

export default function ChatMessagesSkeleton() {
    const numberOfChatBubbles = 28;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Stack spacing={2}>
                {Array.from({ length: numberOfChatBubbles }).map((_, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                        {
                            index % 2 === 0 && (
                                <Skeleton variant="circular" width={40} height={40} className='rounded-xl' />
                            )
                        }
                        <Skeleton variant="rectangular" width={'40%'} height={60} className='rounded-xl' />
                        {
                            index % 2 !== 0 && (
                                <Skeleton variant="circular" width={40} height={40} className='rounded-xl' />
                            )
                        }
                    </Stack>
                ))}
            </Stack>
        </motion.div>
    );
}
