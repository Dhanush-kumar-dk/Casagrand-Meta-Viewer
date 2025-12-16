# 📄 Casagrand Meta Viewer: Local Setup Guide

This guide provides the necessary steps to clone the repository, install dependencies, and build the project for local development or deployment.


<div align="center">

# 🚀 Mobile Application APK

### 📱 Fast • Secure • Easy to Install

[⬇️ **DOWNLOAD APK** ⬇️](https://drive.usercontent.google.com/download?id=1dbRujC4eDns8TeCH1-AsnbqqeX6dwIBw&export=download&authuser=0)

</div>
## ▶️ Watch Video

[Click here to play the video](https://drive.google.com/file/d/1bYbyobc070hwQu3Y4fDPp2IpqVL0GMEL/view?usp=drive_link)

---

## ✨ About the App

This project provides a **ready-to-install Android APK** for the mobile application.  
No Play Store required — simply download, install, and start using the app instantly.

---

## 📥 Download

🔗 **Google Drive APK Link**  
👉 https://drive.usercontent.google.com/download?id=1dbRujC4eDns8TeCH1-AsnbqqeX6dwIBw&export=download&authuser=0

> ✅ Ensure the file is shared as **“Anyone with the link can view/download”**

---

## 📲 How to Install (Step-by-Step)

### 🔹 Step 1: Download
Click the **Download APK** link above.

### 🔹 Step 2: Allow Installation
Go to:Enable permission for your browser or file manager.

### 🔹 Step 3: Install
Tap the APK file and select **Install**.

### 🔹 Step 4: Launch
Open the app and enjoy 🎉

---

## 🧾 App Requirements

| Requirement | Details |
|------------|--------|
| 📱 Platform | Android |
| ⚙️ OS Version | Android 7.0+ |
| 📦 File Type | APK |
| 🌐 Internet | Optional / App-dependent |

---

## 🔐 Security Disclaimer

⚠️ This app is **not distributed via Google Play Store**.  
Please install only if you **trust the source**.

---

## 🆕 Version Info

- **Version:** 1.0.0  
- **Release:** Stable  
- **Build:** Production

---

## 🛠 Troubleshooting

**APK not installing?**
- Make sure "Install unknown apps" is enabled
- Free up storage space
- Re-download the APK

**App not opening?**
- Restart your device
- Check Android version compatibility

---

## 🤝 Support & Contact

For support, bug reports, or updates, please contact the project owner or developer.

---

## 📜 License

© 2025 Mobile App Project  
All rights reserved.


## Prerequisites

Before starting, ensure you have the following installed on your system:

* **Git:** Required for cloning the repository.
* **Node.js & npm:** Used for managing project dependencies and running build scripts.

## Setup Instructions

Follow these steps in your terminal or command prompt:

### Step 1: Clone the Repository

Use the provided GitHub URL to download the project source code to your local machine.

```bash
git clone [https://github.com/Dhanush-kumar-dk/Casagrand-Meta-Viewer.git](https://github.com/Dhanush-kumar-dk/Casagrand-Meta-Viewer.git)

Converting your Node.js application to an Android APK using Ionic Capacitor is the recommended Hybrid App approach.
Key Distinction: Capacitor is used to wrap your frontend web application (HTML, CSS, JavaScript) into a native container. Your Node.js backend logic will not run on the mobile device itself; it will remain on a remote server (like AWS, Heroku, or your own hosting) and the mobile app will communicate with it via API calls over the internet.
Here is the step-by-step process for converting your web app's frontend and connecting it to your existing Node.js backend using Capacitor:

🚀 Phase 1: Prerequisites and Setup

Step 1: Isolate Your Frontend
Ensure your Node.js application is a standard Client-Server architecture.


Frontend: All HTML, CSS, and client-side JavaScript that makes up your user interface should be in a separate directory (e.g., public, build, or dist). This is the code that Capacitor will package.

Backend: Your core Node.js/Express server logic that handles database connections and serves the API endpoints (/users, /data, etc.).

Step 2: Environment Setup
You must have the following installed:

Node.js & npm (or yarn/pnpm).

Android Studio (for Android SDK, build tools, and the final build environment).

The Ionic CLI (optional, but helpful):

```Bash

npm install -g @ionic/cli
```
Step 3: Initialize and Build Your Web App
Navigate to the root directory of your frontend project and run your framework's build command to create the production files.

Example (React/Angular/Vue): npm run build

This command typically creates a production folder, often named build, dist, or www. Note this directory name, as you'll need it for Capacitor's configuration.

💻 Phase 2: Installing and Configuring Capacitor

Step 4: Install Capacitor Core
Install the necessary Capacitor packages in your frontend project's directory:

```Bash

npm install @capacitor/core @capacitor/cli
```
Step 5: Initialize Capacitor

Run the initialization command. 

You will be prompted for your application name and the Web Asset Directory (this is the build folder name from Step 3).

```Bash

npx cap init
```
App Name: Casagrand Meta Viewer

App ID: A unique package identifier (e.g., com.mycompany.mynodeapp)

Step 6: Add the Android Platform

Add the Android platform to your project. 

This creates a fully functional native Android project directory named android.

```Bash

npx cap add android
```
⚙️ Phase 3: Deployment and Communication

Step 7: Configure API Communication

This is the most critical step for your Node.js backend:

Step 8: Copy Web Assets (Sync)

Run the sync command to copy your latest built frontend files into the native 

Android project:

```bash
npm run build && npx cap sync

npm run build: Rebuilds your frontend code.

npx cap sync: Copies the web code and updates any native dependencies.
```
Step 9: Open and Build the APK
Open the native Android project in Android Studio:

```Bash
npx cap open android
```
Android Studio: Once Android Studio opens, it may take a moment to sync Gradle files.

Run/Test: Use the Run button (green play icon) to launch the app on a connected device or emulator for testing.

Build Final APK: To create a shareable APK:
In the top menu, go to Build > Build Bundle(s) / APK(s) > Build APK(s).

This generates an unsigned APK in the android/app/build/outputs/apk/debug/ folder that you can use for testing or distributing outside the Google Play Store.

Code
```Bash
npm install -g @ionic/cli

npm install @capacitor/core @capacitor/cli

npx cap init

npx cap add android

npm run build: Rebuilds your frontend code.

npx cap sync: Copies the web code and updates any native dependencies.

npx cap open android
```

Open Android Studio and run the application with virtual-Elumunator or use Mobile Device
