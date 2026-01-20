# Template Pages - Profile Data Integration Guide

## ✅ HOW IT WORKS NOW

When a user searches for a profile (index.html):
1. ✅ Email is entered and converted to username format
2. ✅ Data is fetched from AppScript
3. ✅ Profile data is stored in `sessionStorage`
4. ✅ User is redirected to the appropriate template page

When template page loads (template1.html, template2.html, etc.):
1. ✅ `script.js` detects it's a template page
2. ✅ Retrieves profile data from `sessionStorage`
3. ✅ **Automatically calls `loadProfile(data)`**
4. ✅ **All profile content is loaded into the page**

---

## 🎯 WHAT loadProfile() DOES

The `loadProfile(item)` function automatically populates:

### 1. **Profile Navigation Section** (`#nav-data`)
```
- Short name heading
- Profile image
- Full name
- Address
```

### 2. **Image Slider** (`#slider`)
```
- Converts multiple images from Google Drive
- Auto-rotates every 5 seconds
- Sets as background with cover fit
```

### 3. **Social Media Cards**
```
- YouTube Card (#youtube-card)
- Instagram Card (#instagram-card)
- Facebook Card (#facebook-card)
- Each with image and clickable link
```

### 4. **Biography/Thought** (`#thought-data`)
```
- User's bio or thought text
```

### 5. **Location Map** (`#map-data`)
```
- Clickable map link with image
```

### 6. **Social Links** (navigation)
```
- #instagram-data
- #facebook-data
- #youtube-data
```

---

## 📋 REQUIRED HTML ELEMENTS

Your template HTML must have these elements:

```html
<!-- Profile Navigation -->
<div id="nav-data"></div>

<!-- Slider -->
<div id="slider"></div>

<!-- Social Cards -->
<div id="youtube-card"></div>
<div id="instagram-card"></div>
<div id="facebook-card"></div>

<!-- Bio Section -->
<div id="thought-data"></div>

<!-- Map Section -->
<div id="map-data"></div>

<!-- Social Links (for navigation) -->
<a id="youtube-data" href="#"></a>
<a id="instagram-data" href="#"></a>
<a id="facebook-data" href="#"></a>
```

---

## 🔄 GOOGLE DRIVE IMAGE CONVERSION

All Google Drive URLs are automatically converted:

**Before:**
```
https://drive.google.com/open?id=1XnLP92kxsmUnI6BF0XHLAo6k7_nCzBcF
```

**After (viewable):**
```
https://drive.google.com/uc?export=view&id=1XnLP92kxsmUnI6BF0XHLAo6k7_nCzBcF
```

This happens automatically in the `driveImage()` function.

---

## 📱 DATA FORMAT RECEIVED

```javascript
{
  "shortName": "AMARJEET",
  "fullName": "Amarjeet Kumar",
  "proimage": "https://drive.google.com/open?id=...",
  "saddress": "DALSINGHSRAY,SMASTIPUR,INDIA",
  "slider": "url1, url2, url3, url4, url5",
  "yimage": "https://drive.google.com/open?id=...",
  "yurl": "https://youtube.com/@...",
  "iimage": "https://drive.google.com/open?id=...",
  "iurl": "https://www.instagram.com/...",
  "fimage": "https://drive.google.com/open?id=...",
  "furl": "https://www.facebook.com/...",
  "thought": "My bio text here...",
  "map": "https://maps.app.goo.gl/...",
  "template": 2
}
```

---

## 🚀 TESTING CHECKLIST

- [ ] User searches with valid email
- [ ] Redirects to correct template based on template number
- [ ] Profile image loads
- [ ] Slider auto-rotates
- [ ] Social card images display
- [ ] Social links are clickable
- [ ] Bio text appears
- [ ] Map link works
- [ ] All Google Drive images convert correctly
- [ ] Page title shows user name

---

## ⚠️ TROUBLESHOOTING

### Images not loading?
- Check if Google Drive URLs are public/shareable
- Verify the driveImage() conversion is working (check console)

### No profile data appearing?
- Open browser DevTools (F12)
- Check sessionStorage in Application tab
- Verify template page has required HTML IDs

### Profile not loading on page refresh?
- This is expected - sessionStorage clears on refresh
- User must search from index.html again

### Wrong template showing?
- Check the `template` field in AppScript database
- Should be 1, 2, 3, or 4
- Default is template 1 if missing

---

## 💡 ADVANCED: Manual Profile Loading

If you want to manually load profile data:

```javascript
// In any template page
const profileData = JSON.parse(sessionStorage.getItem("profileData"));
loadProfile(profileData);
```

---

## ✅ STATUS: READY FOR DEPLOYMENT

All logic is implemented and automatic. Template pages will load profile data immediately upon page load.

**No additional setup needed!**
