
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db'; // Ensure this path is correct

const handleQrcode = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const qrcodes = await prisma.qrcodes.findMany(); // Fetch all members
        res.status(200).json(qrcodes);
    } catch (error) {
        console.error("Error fetching qrcodes:", error);
        res.status(500).json({ error: 'Failed to fetch qrcodes' });
    }
};

export default handleQrcode;