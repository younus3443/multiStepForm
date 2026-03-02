

const next = document.querySelector(".next")
const name = document.querySelector(".name")
const email = document.querySelector(".email")
const number = document.querySelector(".number")

if (name && email && number && next) {

    function showError(input, message) {
        removeError(input)
        input.classList.remove("border-gray-300", "border-blue-500")
        input.classList.add("border-red-500")
        const error = document.createElement("span")
        error.textContent = message
        error.classList.add(
            "error",
            "absolute",
            "right-0",
            "top-0",
            "text-red-500",
            "text-xs",
            "font-medium"
        )

        input.parentElement.appendChild(error)
    }
    function removeError(input) {
        input.classList.remove("border-red-500")
        const err = input.parentElement.querySelector(".error")
        if (err) err.remove()
    }
    [name, email, number].forEach(input => {
        input.addEventListener("input", () => {
            removeError(input)
        })
    })

    next.addEventListener("click", () => {

        let isValid = true
        if (name.value.trim() === "") {
            showError(name, "This field is required")
            isValid = false
        }
        if (!email.value.includes("@") || !email.value.includes(".com")) {
            showError(email, "Enter valid email")
            isValid = false
        }
        const phoneValue = number.value.replace(/\D/g, "")
        if (phoneValue.length < 10) {
        showError(number, "Must be at least 10 digits")
        isValid = false
        }
        if (!isValid) return
        window.location.href = "step2.html"
    })
}

function getNumber(str) {
    return Number(str.replace(/[^0-9]/g, ""))
}

function getBillingType() {
    return localStorage.getItem("billingType") || "monthly"
}

function setBillingType(type) {
    localStorage.setItem("billingType", type)
}

// STEP-2

const arcadePrice = document.querySelector(".arcadeprice")
const advancedPrice = document.querySelector(".advancedprice")
const proPrice = document.querySelector(".proprice")
const toggle = document.querySelector(".toggle")

const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
const btn3 = document.querySelector(".btn3")

const free = document.querySelectorAll(".free")
if (toggle) {
    toggle.checked = getBillingType() === "yearly"

    updatePlanPrices()

    toggle.addEventListener("change", () => {
        const type = toggle.checked ? "yearly" : "monthly"
        setBillingType(type)
        updatePlanPrices()
    })
}

function updatePlanPrices() {

    if (!arcadePrice) return

    const yearly = getBillingType() === "yearly"

    if (yearly) {
        arcadePrice.textContent = "$90/yr"
        advancedPrice.textContent = "$120/yr"
        proPrice.textContent = "$150/yr"

        free.forEach(f => f.textContent = "2 months free")
    } else {
        arcadePrice.textContent = "$9/mo"
        advancedPrice.textContent = "$12/mo"
        proPrice.textContent = "$15/mo"

        free.forEach(f => f.textContent = "")
    }
}

// Select Plan
function selectPlan(button, priceElement, planName) {

    if (!button) return

    [btn1, btn2, btn3].forEach(b => {
        if (b) b.classList.remove("bg-blue-50")
    })

    button.classList.add("bg-blue-50")

    localStorage.setItem("selectedPlan", planName)
    localStorage.setItem("selectedPrice", priceElement.textContent)
}

if (btn1) btn1.addEventListener("click", () => selectPlan(btn1, arcadePrice, "Arcade"))
if (btn2) btn2.addEventListener("click", () => selectPlan(btn2, advancedPrice, "Advanced"))
if (btn3) btn3.addEventListener("click", () => selectPlan(btn3, proPrice, "Pro"))


// STEP-3

const addons = document.querySelectorAll(".addon")

if (addons.length > 0) {
    const savedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || []

    addons.forEach(addon => {

        const match = savedAddons.find(a => a.name === addon.dataset.name)
        if (match) addon.checked = true

        addon.addEventListener("change", () => {

            let selected = []

            addons.forEach(a => {
                if (a.checked) {
                    selected.push({
                        name: a.dataset.name,
                        monthly: a.dataset.monthly,
                        yearly: a.dataset.yearly
                    })
                }
            })

            localStorage.setItem("selectedAddons", JSON.stringify(selected))
        })
    })
}


// STEP-4

const planType = document.querySelector(".typeplan")
const planLabel = document.querySelector(".plan")
const planPrice = document.querySelector(".planprice")
const totalElement = document.querySelector(".totalplan")
const planContainer = document.querySelector(".planTotal")
const totalBill=document.querySelector(".total_bill")

if (planType && planPrice) {

    const savedPlan = localStorage.getItem("selectedPlan")
    const savedPrice = localStorage.getItem("selectedPrice")
    const savedAddons = JSON.parse(localStorage.getItem("selectedAddons")) || []
    const billingType = getBillingType()

    if (savedPlan && savedPrice) {

        planType.textContent = savedPlan
        planLabel.textContent = `(${billingType})`
        planPrice.textContent = savedPrice

        let basePrice = getNumber(savedPrice)
        let addonTotal = 0

        // remove static addon rows
        document.querySelectorAll(".dynamic-addon").forEach(e => e.remove())

        savedAddons.forEach(addon => {

            const price = billingType === "monthly"
                ? Number(addon.monthly)
                : Number(addon.yearly)

            addonTotal += price

            const div = document.createElement("div")
            div.classList.add("flex", "justify-between", "text-sm", "dynamic-addon")

            div.innerHTML = `
                <span class="text-gray-400 font-bold">${addon.name}</span>
                <span>+$${price}/${billingType === "monthly" ? "mo" : "yr"}</span>
            `

            planContainer.insertBefore(div, document.querySelector(".total"))
        })

        const finalTotal = basePrice + addonTotal

        totalElement.textContent =billingType === "monthly"? "(per month)": "(per year)"

        totalBill.textContent =
            `+$${finalTotal}/${billingType === "monthly" ? "mo" : "yr"}`
    }
}