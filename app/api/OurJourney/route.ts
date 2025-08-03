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
      spreadsheetId: process.env.OURJOURNEYSPREADSHEET_ID,
      range: 'Timeline!A2:D', // Assuming columns: image, title, description, date
    });

    const rows = response.data.values || [];

    function convertToDirectImageLink(driveLink?: string) {
      if (!driveLink) return '/images/welcome.jpg';

      const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\//);
      if (!match) return driveLink;

      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    const timelineItems = rows.map((row) => ({
      image: convertToDirectImageLink(row[3]) || '/images/default.jpg',
      title: row[0],
      description: row[1],
      date: row[2],
    }));

    return NextResponse.json({ timelineItems });
  } catch (err) {
    console.error('Google Sheets error (timeline):', err);
    return NextResponse.json({ timelineItems: [] }, { status: 500 });
  }
}
