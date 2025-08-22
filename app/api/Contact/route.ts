import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { verifyRecaptcha } from '@/lib/verifyRecaptcha'

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, institute, subject, message, recaptchaToken } = await req.json()

    // 1. Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 2. Verify reCAPTCHA
    const recaptchaRes = await verifyRecaptcha(recaptchaToken)
    if (!recaptchaRes.success || (recaptchaRes.score !== undefined && recaptchaRes.score < 0.5)) {
      return NextResponse.json({ error: 'Failed reCAPTCHA check' }, { status: 403 })
    }

    // 3. Auth with Google Sheets
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })

    // 4. Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.CONTACT_SPREADSHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, contact, institute, subject, message, new Date().toISOString()]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Google Sheets error:', error)
    return NextResponse.json({ error: 'Failed to save contact info' }, { status: 500 })
  }
}
