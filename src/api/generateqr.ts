// pages/api/generate-qr.ts
import prisma from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const generateQrCodes = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { count } = req.body;

    if (!count || count < 1) {
      return res.status(400).json({ error: 'Count must be a positive number.' });
    }

    try {
      const codes = [];
      for (let i = 1; i <= count; i++) {
        const qrCodeUrl = `https://vishalnawle.in/politics/member.php?pl=${i}`;
        codes.push(qrCodeUrl);

        await prisma.qrcodes.create({
          data: {
            qr_code_no: i,
            status: 'active',
            allocated_date: new Date(),
          },
        });
      }

      res.status(200).json({ message: 'QR codes generated successfully.', codes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating QR codes.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default generateQrCodes;