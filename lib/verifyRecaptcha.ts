interface RecaptchaResponse {
    success: boolean
    score?: number
    action?: string
    challenge_ts?: string
    hostname?: string
    "error-codes"?: string[]
  }
  
  export async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
      throw new Error("Missing RECAPTCHA_SECRET_KEY in environment")
    }
  
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    })
  
    if (!res.ok) {
      throw new Error("Failed to verify reCAPTCHA with Google")
    }
  
    const data: RecaptchaResponse = await res.json()
    return data
  }
  