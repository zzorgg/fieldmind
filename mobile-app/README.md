# Fieldmind Mobile App

This Expo app now includes Supabase authentication with:

- Email/password sign in and sign up
- Google OAuth
- GitHub OAuth

## Environment Setup

Create a `.env` file from `.env.example` and fill values from your Supabase project:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY"
```

## Provider Configuration

In Supabase Dashboard, go to Authentication -> Providers:

1. Enable Google
2. Enable GitHub
3. Add these redirect URLs:
   - `mobileapp://auth/callback`
   - your local Expo URL if testing web (`http://localhost:8081/auth/callback`)

Then configure OAuth apps:

1. Google Cloud Console OAuth app:
   - Add authorized redirect URI from Supabase Google provider settings.
   - For web testing, add authorized JavaScript origin for your Expo web URL.
2. GitHub OAuth app:
   - Callback URL must match Supabase GitHub provider redirect URL.

## Run the App

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial for building native apps with Expo.

## Join the community

Join our community of developers building native apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
