# How to use this tool.

## 1. Create a github app.

1. Go to `setting->Developer settings->GitHub Apps->New GitHub App` and fill in the form.
2. Make sure you have checked the `Read & Write` permission for `Issues` under `Repository permissions`.
3. For HomePage Url you can fill in `https://localhost:3000`

## 2. Generate a private key.

- Right after creating the app, you will be redirected to the app's page. Click on `Generate a private key` and download the `.pem` file.
- This .pem file you can put in the `config` folder. We'll use it later.

## 3. Install the app to your repository.
1. Go to `setting->Developer settings->GitHub Apps->Your App->Install App`
2. Choose the user or organization you want to install the app to.
3. Choose the repository you want to install the app to. 
4. Click on `Install`

## 4. Get the installation Id,
1. Go to `setting->Developer settings->GitHub Apps->Your App->Install App`
2. Click on the `Configure` button.
3. Copy the `Installation Id` from the url. `https://github.com/settings/installations/{InstallationId}`
4. Open the `nuxt.config.ts` file and paste the `Installation Id` in the `installationId` field.

## 5. Get the app's id.
1. Go to `setting->Developer settings->GitHub Apps->Your App->General`
2. Copy the `App ID`
3. Open the `nuxt.config.ts` file and paste the `App ID` in the `appId` field.

## 6. Fill in the rest of the fields in the `nuxt.config.ts` file.
1. `privateKeyPath` - The path to the `.pem` file you downloaded in step 2.
2. `repository->owner` - The owner of the repository you installed the app to.
3. `repository->name` - The name of the repository you installed the app to.

## 7. Run the app.
1. To make sure you have all the dependencies installed, run `npm install`.
2. To run the app, run `npm run dev`.