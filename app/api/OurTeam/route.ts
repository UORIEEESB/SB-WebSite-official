import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.OURTEAMSPREADSHEET_ID,
      range: 'Team!A2:C',
    });

    const rows = response.data.values || [];

    function convertToDirectImageLink(driveLink?: string) {
      if (!driveLink) return '/images/welcome.jpg';

      const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\//);
      if (!match) return driveLink;

      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    const teamMembers = rows.map((row) => ({
      name: row[0],
      role: row[1],
      photo: convertToDirectImageLink(row[2]),
    }));

    return NextResponse.json({ teamMembers });
  } catch (err) {
    console.error('Google Sheets error:', err);
    return NextResponse.json({ teamMembers: [] }, { status: 500 });
  }
}
