# Inventory Management System - Mobile App

This repository contains the mobile application for the Inventory Management System. It's built using React Native and Expo, offering a seamless inventory management experience on your smartphone.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 14.0+
- Expo CLI
- Expo Go app for iOS and Android for testing the application on your device.
- EAS CLI for building with EAS Build.

### Installation

1. Clone the repository:
    ```shell
    git clone https://git@github.com:bokievkhushnud/ims-scanner.git
    ```
2. Navigate into the project directory:
    ```shell
    cd inventory-management-system-mobile
    ```
3. Install the dependencies:
    ```shell
    npm install
    ```

### Running the Application

Start the development server:

    ```shell
    expo start
    ```
This will start the Metro bundler and open up a developer tools page in your web browser. From there, you can run the app on any device or emulator.

### Building the Application

To build the application, you'll use EAS Build. First, make sure you're logged into your Expo account:

     ```shell
    eas login
    ```
Then, to build the app for both platforms:

    ```shell
    eas build --platform all
    ```
  
### Acknowledgments
React Native - The framework used.
Expo - For simplifying the development process.
EAS - For seamless builds.
Khushnud Boqiev - Initial work.


