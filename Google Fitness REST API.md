# Google Fitness REST API



## 1. Get a Google Account

To use the Fitness REST API, you need a [Google Account](https://www.google.com/accounts/NewAccount). If you already have an account, then you're all set. You may also want to create a separate Google Account for testing purposes.



## 2. Request an OAuth 2.0 client ID

Follow these steps to request an OAuth 2.0 client ID for the Fitness API.

1. Go to the [Google API Console](https://console.developers.google.com/flows/enableapi?apiid=fitness).

2. Select a project, or create a new one. Use the same project for the Android and REST versions of your app.

3. Click **Continue** to enable the Fitness API.

4. Click **Go to credentials**.

5. Click **New credentials**, then select **OAuth Client ID**.

6. Under **Application type**, select **Web application**.

7. Under **Authorized JavaScript origins**, enter the base URL of the site from which requests will originate (for example `https://developers.google.com` is the URL used by the OAuth Playground).

8. Under **Authorized redirect URI**, enter the URL of the site where responses will be handled (for example `https://developers.google.com/oauthplayground` is the URL used by the OAuth Playground).

9. Click **Create**. Your new OAuth 2.0 **Client ID and secret** appear in the list of IDs for your project. An OAuth 2.0 Client ID is a string of characters, something like this:

   `780816631155-gbvyo1o7r2pn95qc4ei9d61io4uh48hl.apps.googleusercontent.com`

10. Add **Client ID and secret** to an **.env file** in your project

