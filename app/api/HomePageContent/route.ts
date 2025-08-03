import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.HOMEPAGE_SPREADSHEET_ID,
      range: 'About!A2:Y2', // includes all existing + footer fields
    })

    const row = response.data.values?.[0]

    if (!row) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

    const keys = [
      'Hero_Title',         // A
      'Hero_Para',          // B
      'About_Title',        // C
      'About_Para',         // D
      'Projects',           // E
      'Members',            // F
      'Sub_Chapters',       // G
      'Animation_img_1',    // H
      'Animation_img_2',    // I
      'Animation_img_3',    // J
      'Animation_img_4',    // K
      'Animation_img_5',    // L
      'Footer_Address',     // M
      'Email',              // N
      'Phone',              // O
      'Facebook',           // P
      'Youtube',            // Q ✅
      'Twitter',            // R
      'Linkedin',           // S
      'Merch_Img',          // T
      'Merch_Price',        // U
      'Merch_Buy_Link',     // V
      'Join_Link',          // W
      'Contact_link',       // X
      'Award_Image',        // Y
    ]

    const homepageData: Record<string, string> = {}
    keys.forEach((key, index) => {
      homepageData[key] = row[index] || ''
    })

    // Convert image links to direct Google Drive images
    const driveImageKeys = [
      'Animation_img_1',
      'Animation_img_2',
      'Animation_img_3',
      'Animation_img_4',
      'Animation_img_5',
      'Merch_Img',
      'Award_Image',
    ]

    driveImageKeys.forEach((key) => {
      homepageData[key] = convertToDirectImageLink(homepageData[key])
    })

    // Rename footer fields for frontend consistency
    const formattedData = {
      homepageData: {
        ...homepageData,
        Address: homepageData['Footer_Address'] || '',
        University: 'University of Ruhuna',
        Address_Line_1: 'Faculty of Engineering',
        Address_Line_2: 'Hapugala, Galle',
      },
    }

    return NextResponse.json(formattedData)
  } catch (err) {
    console.error('Google Sheets fetch error:', err)
    return NextResponse.json({ homepageData: {} }, { status: 500 })
  }
}

function convertToDirectImageLink(driveLink?: string) {
  if (!driveLink) return ''
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)\//)
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveLink
}
