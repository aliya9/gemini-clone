# 🤖 Gemini Clone - AI Chat Application

A fully functional Gemini AI chat application built with React and Vite. This is a clone of Google's Gemini interface with full chat functionality.

## ✨ Features

- 💬 Real-time AI chat with Google Gemini
- 📝 Chat history management
- 🎨 Modern, clean UI
- ⚡ Fast and responsive
- 🔄 Auto-scrolling messages
- 💾 Conversation persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   Create a `.env` file in the root directory:
   ```bash
   # Create .env file
   touch .env
   ```
   
   Add your API key to the `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   ⚠️ **IMPORTANT:** Never commit your `.env` file to GitHub! It's already in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
gemini-clone/
├── src/
│   ├── components/
│   │   ├── main/          # Main chat interface
│   │   └── sidebar/        # Sidebar with chat history
│   ├── config/
│   │   └── gemini.js       # Gemini API configuration
│   ├── context/
│   │   └── context.jsx    # React Context for state management
│   └── assets/             # Images and icons
├── .env                    # Your API key (NOT in git)
├── .env.example            # Template for .env file
└── .gitignore              # Git ignore rules
```

## 🔐 Security: Protecting Your API Key

### Why hide the API key?

- **Prevents abuse:** If someone gets your API key, they can use it and you'll be charged
- **Security best practice:** Never expose secrets in code
- **GitHub safety:** Public repos are scanned for exposed keys

### How we protect it:

1. ✅ **`.env` file is in `.gitignore`** - Won't be committed to Git
2. ✅ **No hardcoded keys** - API key only comes from environment variables
3. ✅ **`.env.example` template** - Shows format without exposing keys

### Setting up for GitHub:

1. **Before your first commit:**
   ```bash
   # Make sure .env is in .gitignore (already done)
   git status  # Verify .env is not listed
   ```

2. **Create `.env` file locally:**
   ```bash
   echo "VITE_GEMINI_API_KEY=your_key_here" > .env
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```

4. **For collaborators:**
   - They need to create their own `.env` file
   - Use `.env.example` as a template
   - Never share API keys in chat/email

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 How It Works

1. **User sends message** → UI component
2. **Context manages state** → Adds message to chat
3. **Gemini API called** → Sends message to Google
4. **Response received** → Added to chat history
5. **UI updates** → User sees AI response

See `GEMINI_INTEGRATION_EXPLANATION.md` for detailed technical explanation.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 🐛 Troubleshooting

### "VITE_GEMINI_API_KEY is not set!"
- Make sure you created a `.env` file in the root directory
- Check that the file contains: `VITE_GEMINI_API_KEY=your_key`
- Restart the dev server after creating/updating `.env`

### "No available Gemini models found"
- Check your API key is valid
- Verify you have access to Gemini API
- Check browser console for detailed error messages

### API Key Issues
- Get a new key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Make sure the key has proper permissions
- Check if you've exceeded quota limits

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Google Gemini API Docs](https://ai.google.dev)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Google Gemini AI
- UI inspired by Google's Gemini interface

---

**Remember:** Never commit your `.env` file! 🔒
