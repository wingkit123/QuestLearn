# QuestLearn — Manual Tasks Guide

This guide outlines the tasks that require manual setup outside of the automated codebase.

## 1. Supabase Setup

Since we are using Supabase for Auth and Database, you need to set up a project and configure the schema.

1. **Create a Supabase Project:**
   - Go to [Supabase](https://supabase.com) and create a new project.
2. **Apply Database Schema:**
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Open the `part-ii/Database-Schema.sql` file from this repository.
   - Copy the contents and run it in the SQL Editor to create all tables, views, and RLS policies.
3. **Seed Initial Data:**
   - Open the `part-iii/Supabase-Seed-Data.sql` file.
   - Copy the contents and run it to populate the `role`, `user`, and mock data for Advisor and Admin.
4. **Environment Variables:**
   - Go to Project Settings -> API in Supabase.
   - Copy the `Project URL` and `anon public` key.
   - Create a `.env.local` file in the root of the Next.js project and add:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

## 2. H5P / Lumi Cloud Integration

We use [Lumi Cloud](https://app.lumi.education/) to host interactive H5P content, which is then embedded into QuestLearn via iframes.

1. **Create Lumi Account:**
   - Sign up for a free account at Lumi Cloud.
2. **Create Interactive Content:**
   - Use their desktop app or web interface to create interactive videos, quizzes, or presentations.
3. **Get Embed Link:**
   - Once a resource is created, click "Share" or "Embed".
   - Copy the `src` URL from the iframe code (e.g., `https://app.lumi.education/api/v1/run/xyz...`).
4. **Add to QuestLearn:**
   - When creating a lesson in QuestLearn, select "H5P / Lumi" as the content type.
   - Paste the embed URL into the "Embed URL" field. The platform will automatically render it as an iframe.
