# 🔧 Supabase Setup Guide - Fix API Key Error

## 🚨 Problem
You're seeing "Invalid API key" errors because the Supabase configuration is missing or incorrect.

## ✅ Solution

### Step 1: Get Your Supabase API Keys
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy these two values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long string starting with `eyJ`)

### Step 2: Configure Environment Variables
1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 3: Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Verify Setup
1. Open your browser to `http://localhost:9002`
2. Navigate to the music selection screen
3. You should no longer see API key errors

## 🔍 Troubleshooting

### Still getting errors?
- **Double-check your API key**: Make sure you copied the full `anon public` key
- **Verify project URL**: Ensure it matches your Supabase project
- **Restart server**: Environment variables only load on server start
- **Check file location**: `.env.local` should be in the project root (same level as `package.json`)

### Need to create database tables?
If your Supabase project is new, run the SQL migration:
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-migration.sql`
3. Click **Run**

## 📞 Need Help?
- Check the [Supabase Documentation](https://supabase.com/docs)
- Verify your project is active in the Supabase dashboard
- Make sure you're using the correct project (if you have multiple)