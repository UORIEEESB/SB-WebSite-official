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
      spreadsheetId: process.env.NEWSSPREADSHEET_ID,
      range: 'Events!A2:D', // Assuming columns: title, date, description, image
    });

    const rows = response.data.values || [];

    function convertToDirectImageLink(driveLink?: string) {
        if (!driveLink) return '/images/welcome.jpg';
  
        const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\//);
        if (!match) return driveLink;
  
        const fileId = match[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }

    const events = rows.map((row) => ({
      title: row[0],
      date: row[1],
      description: row[2],
      image: convertToDirectImageLink(row[3]) || '/images/events.jpg',
    }));

    return NextResponse.json({ events });
  } catch (err) {
    console.error('Google Sheets error (events):', err);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}
