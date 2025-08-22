export async function verifyRecaptcha(token: string) {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      throw new Error('Missing reCAPTCHA secret key')
    }
  
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    )
  
    if (!res.ok) {
      throw new Error('Failed to verify reCAPTCHA')
    }
  
    return res.json() as Promise<{ success: boolean; score?: number; [key: string]: any }>
  }
  