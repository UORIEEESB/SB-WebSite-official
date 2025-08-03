import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, institute, subject, message } = await req.json()

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.CONTACT_SPREADSHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, contact, institute, subject, message]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Google Sheets error:', error)
    return NextResponse.json({ error: 'Failed to save contact info' }, { status: 500 })
  }
}
