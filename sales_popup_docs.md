# Sales Popup Documentation

This document explains the technical details, user experience logic, and customization options for the promotional **Sales Popup** modal component in the **DealBlast** electronics flash-sale landing page.

---

## 1. File Location & Import
* **Component Path:** [SalesPopup.jsx](file:///c:/Users/SHUVADEEP%20MASANTA/Desktop/sells/src/components/SalesPopup.jsx)
* **Usage:** Imported and rendered in [App.jsx](file:///c:/Users/SHUVADEEP%20MASANTA/Desktop/sells/src/App.jsx#L15) as a global page overlay:
  ```javascript
  import SalesPopup from './components/SalesPopup';
  // ...
  <SalesPopup />
  ```

---

## 2. Trigger Logic & Rules

The popup uses a hybrid display logic designed to be non-intrusive for returning users while remaining easy for developers to test.

Here is the logic implemented inside the `useEffect` hook:

```javascript
useEffect(() => {
  let hasVisited = false;
  let forcePopup = false;

  // 1. Check if user has visited before using Local Storage
  try {
    hasVisited = localStorage.getItem('dealblast_visited');
  } catch (e) {
    console.warn('Storage blocked:', e);
  }

  // 2. Check if a URL query parameter forces the popup
  try {
    forcePopup = window.location.search.includes('popup=true');
  } catch (e) {
    console.warn('Location blocked:', e);
  }

  // 3. Trigger condition
  if (forcePopup || !hasVisited) {
    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        localStorage.setItem('dealblast_visited', 'true');
      } catch (e) {
        // ignore
      }
    }, 1500); // 1.5s delay
    return () => clearTimeout(timer);
  }
}, []);
```

### Display Conditions Flow:
1. **First-Time Visitors:** 
   * When a user loads the page, the component looks for the `dealblast_visited` key in `localStorage`.
   * If the key is **not** present, a timer starts. After a **1.5-second delay**, the popup slides into view.
   * Immediately upon showing, the app writes `dealblast_visited: 'true'` to `localStorage`.
2. **Returning Visitors:**
   * On subsequent page reloads or visits, `dealblast_visited` evaluates to `true`.
   * The popup is bypassed entirely and will **not** show.
3. **URL Query Override (`?popup=true`):**
   * If the URL contains `?popup=true` (e.g., `https://deal-blast.vercel.app/?popup=true`), the popup triggers **every single time** the page is loaded, regardless of whether the user has visited before.

---

## 3. Core Features & Layout

The popup modal consists of the following UI and logic blocks:

* **Animated Entry/Exit:** Wrapped in Framer Motion's `<AnimatePresence>` to support smooth entrance scaling and fade-out transitions on close.
* **Banner Image:** Displays a high-contrast 3D promotion image (`/images/promo_banner.png`) representing the 65% OFF flash-sale event.
* **Coupon Ticket Box:**
  * Displays the promo code `FLASH65`.
  * Features a **Copy Code** button that interacts with `navigator.clipboard` to copy the code.
  * Shows visual feedback ("Copied") and fires a global toast notification via `SaleContext` upon copying.
* **Action Buttons:**
  * **Claim Offer & Shop Now:** Copies the code, closes the popup, and smoothly scrolls the user down to the products list (`#products`).
  * **No thanks, continue shopping:** Closes the popup immediately.

---

## 4. How to Test & Reset

If you need to test the popup interface, choose one of these methods:

### Method A: Force using the URL Parameter
Append `?popup=true` to your URL. This forces the modal open 1.5 seconds after loading, even if you've already closed it.
* **Localhost URL:** [http://localhost:5173/?popup=true](http://localhost:5173/?popup=true)
* **Production URL:** [https://deal-blast.vercel.app/?popup=true](https://deal-blast.vercel.app/?popup=true)

### Method B: Use a Private/Incognito Window
Open the website in an Incognito window. Since private sessions don't share `localStorage` with your main browser session, it will register as a first-time visit.

### Method C: Clear Local Storage in Console
1. Press `F12` or right-click the page and select **Inspect**.
2. Click on the **Console** tab.
3. Type the following command and press **Enter**:
   ```javascript
   localStorage.removeItem('dealblast_visited');
   ```
4. Reload the page.

---

## 5. Customization Options

### A. Show the Popup on Every Page Load
If you want to disable the first-visit restrictions completely so it displays on every single reload, change the `useEffect` hook in [SalesPopup.jsx](file:///c:/Users/SHUVADEEP%20MASANTA/Desktop/sells/src/components/SalesPopup.jsx#L11-L38) to this:

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setIsOpen(true);
  }, 1500);
  return () => clearTimeout(timer);
}, []);
```

### B. Adjust the Entrance Delay
To change how long the popup waits before displaying after the page loads, adjust the millisecond value in the timer (default is `1500` ms / 1.5 seconds):

```javascript
// Example: Change to 3000 for a 3-second delay
}, 3000);
```
