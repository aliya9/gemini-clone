# 🔐 API Key Setup Guide

## Quick Setup

1. **Create a `.env` file** in the root directory of the project

2. **Add your API key** to the file:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Replace `your_actual_api_key_here`** with your real Gemini API key

4. **Save the file** - The `.env` file is already in `.gitignore`, so it won't be committed to GitHub

## Example `.env` file:

```env
VITE_GEMINI_API_KEY=AIzaSyAKmbW0APmWAoj3VRy6rsNp0Ff08_612oY
```

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key
5. Paste it in your `.env` file

## Important Security Notes

✅ **DO:**
- Keep your `.env` file local only
- Use `.env` for development
- Share `.env.example` (without real keys) with collaborators

❌ **DON'T:**
- Commit `.env` to GitHub (already in `.gitignore`)
- Share your API key in chat/email
- Hardcode API keys in source code
- Post screenshots with your API key visible

## Verifying Setup

After creating your `.env` file:
1. Restart your dev server (`npm run dev`)
2. Open the browser console (F12)
3. You should NOT see: "❌ VITE_GEMINI_API_KEY is not set!"
4. Try sending a message - it should work!

## Troubleshooting

**"API key not set" error:**
- Make sure `.env` is in the root directory (same level as `package.json`)
- Check the file name is exactly `.env` (not `.env.txt`)
- Restart the dev server after creating/updating `.env`
- Make sure the format is: `VITE_GEMINI_API_KEY=your_key` (no spaces around `=`)

