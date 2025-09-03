import React from 'react';
import {
    Box,
    Typography,
    Card
} from '@mui/material';

function Settings() {
    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Settings
            </Typography>
            <Card sx={{ p: 3 }}>
                <Typography variant="h6">
                    Halaman Pengaturan
                </Typography>
                <Typography>
                    Opsi pengaturan akan tersedia di sini.
                </Typography>
            </Card>
        </Box>
    );
}

export default Settings;
