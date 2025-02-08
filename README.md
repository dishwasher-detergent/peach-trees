# Peach Trees Habit Tracker

Weebhook is an application that allows you to generate custom URLs that can be used as webhook endpoints (e.g., save-took-with.weebhook.com). The application captures and displays the payloads received from various webhooks, enabling you to inspect and analyze them with ease.

### Tech Stack

- Next.js: React framework for building server-rendered and static web applications.
- Tailwind CSS: Utility-first CSS framework for styling.
- Appwrite: Backend-as-a-service for managing authentication, databases, and more.

## Getting Started

### Prerequisites

- Node.js (version 20.x or later)
- Appwrite instance (You can use the Appwrite cloud or set up locally)

### Installation

Clone the repository:

```bash
git clone https://github.com/dishwasher-detergent/peach-trees.git
cd peach-trees
```

### Install dependencies:

```bash
npm install
```

### Set up environment variables:

Create a .env.local file in the root directory and configure the following:

```bash
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000

NEXT_PUBLIC_APPWRITE_PROJECT_ID=progress-tracker
NEXT_PUBLIC_DATABASE_ID=progress-tracker
APPWRITE_API_KEY=

NEXT_PUBLIC_GOALS_COLLECTION_ID=goals

NEXT_PUBLIC_GOALS_BUCKET_ID=goals
```

### Run the development server:

```bash
npm run dev
```

The application should now be running at http://localhost:3000.

### Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
