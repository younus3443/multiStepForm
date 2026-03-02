# 🧾 Multi-Step Form (Stepper UI)

A responsive multi-step subscription form built using **HTML, Tailwind CSS, and Vanilla JavaScript**.

This project simulates a real SaaS-style billing system with plan selection, add-ons, billing toggle (monthly/yearly), validation, and dynamic total calculation.

---

## 🚀 Features

- ✅ Step-by-step navigation (4 steps)
- ✅ Form validation (Name, Email, Phone)
- ✅ Monthly / Yearly billing toggle
- ✅ Plan selection with visual highlight
- ✅ Add-ons selection
- ✅ Dynamic total calculation
- ✅ Data persistence using localStorage
- ✅ Responsive design (Mobile + Desktop)
- ✅ Clean UI with Tailwind CSS

---

## 🖥️ Steps Overview

### 1️⃣ Step 1 – Personal Info
- Name validation
- Email validation
- Phone number validation (minimum 10 digits)
- Error messages with red border styling

### 2️⃣ Step 2 – Select Plan
- Choose Arcade / Advanced / Pro
- Monthly / Yearly billing toggle
- Active plan highlighting
- Prices update dynamically

### 3️⃣ Step 3 – Add-ons
- Optional add-ons
- Price adjusts based on billing type
- Selection stored in localStorage

### 4️⃣ Step 4 – Summary
- Displays selected plan
- Displays billing type
- Displays selected add-ons
- Calculates final total dynamically

---

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS
- JavaScript
- localStorage

---

## 📂 Project Structure

```
multistepform
├── index.html # Step 1 - Personal Info
├── step2.html # Step 2 - Select Plan
├── step3.html # Step 3 - Add-ons
├── step4.html # Step 4 - Summary
├── script.js # All JavaScript logic
└── images/ # Icons and background assets
```
