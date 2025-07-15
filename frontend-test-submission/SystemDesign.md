# System Design Document

## 🧱 Project: URL Shortener (Frontend)  
**Track:** Frontend

---

## 🔧 Technology Stack

- **React (TypeScript):** Enables modular component-based development with type safety.
- **Material UI (MUI):** Used as the styling framework as per the test requirement to build responsive, accessible, and clean UI components.
- **Axios:** Handles HTTP requests to the backend API with ease of intercepting and managing responses/errors.
- **React Router DOM:** Manages routing between the shortener, redirection, and statistics pages.
- **@mui/x-data-grid:** Displays analytics in a structured and interactive table.

---

## 🧱 Architecture Overview

The application is structured using React's component-based architecture. Key components:

- **ShortenerForm:**  
  - Handles form input (long URL, custom shortcode, validity).
  - Performs client-side validation.
  - Displays success/error messages.
  - Shows generated short URL and a link to view stats.

- **Redirector:**  
  - Extracts the short code from the route.
  - Calls the API to fetch the corresponding long URL.
  - Redirects user to the original long URL or shows an error message if the code is invalid or expired.

- **StatsPage:**  
  - Displays total clicks, creation and expiry time of the short URL.
  - Uses `DataGrid` to render detailed click data: timestamp, source, and location.

---

## 🗂️ Data Modeling (Frontend)

### Shorten URL Request Payload

```ts
{
  longUrl: string;
  customCode?: string;
  validity?: number;
}
