# OpenProject 

1. open-source project management software
2. designed to support teams throughout the entire project lifecycle.
3. It supports (Waterfall), agile (Scrum, Kanban), and hybrid approaches.

## Key Features:

1. Task Management: Create and manage tasks, assign responsibilities, set deadlines, and track progress.
2. Gantt Charts: Visualize project timelines and dependencies to ensure timely delivery.
3. Agile Boards: Utilize boards for Scrum and Kanban workflows, facilitating iterative development.
4. Time and Cost Reporting: Monitor project expenses and time allocation to stay within budget.
5. Team Collaboration: Enhance communication among team members through shared work packages and discussions.
6. Project Portfolio Management: Manage multiple projects simultaneously, aligning them with organizational goals.
7. Product Roadmap and Release Planning: Plan and track product releases and milestones effectively.
8. Workflows and Customization: Customize workflows to match your team's processes and requirements

## Editions :

1. Community Edition
2. Enterprise Edition

##  Deployment Options:
1. Self-Managed
2. Cloud Hosting

##  Integrations :
1. Version Control: GitHub and GitLab for linking commits and pull requests.
2. Cloud Storage: Nextcloud, OneDrive, and SharePoint for document management.
3. Collaboration Tools: openDesk for team collaboration.​


## Working With Project :

Project : Create a new Project named Now-ERP.
Sales Orders : Create Work Packages (one per Sales Order).
Sales Order Fields (sales order number, dates, price, qty) : Create custom fields inside Work Packages

---

### Here's How You Would Do It:

| What you want | How you do it in OpenProject |
|:--------------|:-----------------------------|
| Project | Create a **new Project** named `Now-ERP`. |
| Sales Orders | Create **Work Packages** (one per Sales Order). |
| Sales Order Fields (sales order number, dates, price, qty) | Create **custom fields** inside Work Packages. |

---

### Step-by-Step Plan:

#### 1. **Create Project**
- Go to **Projects** ➔ **+ New Project** ➔ Name it `Now-ERP`.
- Choose "blank project" or "use a template" if needed.

#### 2. **Customize Work Package Type**
- Go to **Administration** ➔ **Work Packages** ➔ **Types**.
- Create a new **Type** called **Sales Order**.

#### 3. **Create Custom Fields**
- Go to **Administration** ➔ **Custom Fields** ➔ Work Package Custom Fields.
- Create these custom fields:
  - **Sales Order Number** (Text or Number field)
  - **Order Date** (Date field)
  - **Confirm Date** (Date field)
  - **Delivery Date** (Date field)
  - **Price** (Number field)
  - **Quantity (Qty)** (Number field)

Assign these custom fields to the **Sales Order** type.

#### 4. **Create 20 Sales Orders**
- Inside the `Now-ERP` project:
  - Go to **Work Packages**.
  - Create 20 new **Work Packages** of type **Sales Order**.
  - Fill in the sales order number, dates, price, quantity for each one.

---



Got it — you **created a Work Package**, but you **don't see fields** like **Order Date**, **Price**, or **Quantity** — right?

✅ Don't worry — that's **normal** because **OpenProject** **only shows default fields** (like Subject, Status, Assignee) at first.  
To show **your custom fields** like Order Date, Price, and Qty, you need to **create custom fields** and **attach them to your work package type**.

---

# Field Availbility in the Workspace
### 2. **Assign Custom Fields to Your Work Package Type**
- Go to **Administration** ➔ **Work Packages** ➔ **Types**.
- Click on the **Type** you are using (example: if your work package type is "Task" or you created a type called "Sales Order").
- Edit that **Type**.
- Under **Form Configuration**, **add** your custom fields (Sales Order Number, Order Date, etc.) into the form.

👉 Save.

---

### 3. **Now Edit Your Work Package**
- Go back to your **Now-ERP Project** ➔ **Work Packages**.
- Open one sales order work package.
- You will now **see all new fields** (Order Date, Confirm Date, Delivery Date, Price, Quantity) ready to fill in!

---

### ✨ Quick Summary:

| Step | What you do |
|:-----|:------------|
| 1 | Create Custom Fields |
| 2 | Attach Fields to Work Package Type |
| 3 | Edit Work Package — and now you can fill in date, price, qty! |
---


## To See Sales Orders by Delivery Date

Excellent question! 🎯  
**Yes, it is absolutely possible** in OpenProject to **see a list sorted or grouped by Delivery Date**!

You can do it very easily using the **Work Packages table** with **filters**, **sorting**, or even **grouping**.

Let me explain it step-by-step:

---

# 🚀 To See Sales Orders by Delivery Date

## Step 1: Go to Work Packages

- Open your **Now-ERP** project.
- Click **Work Packages** from the left menu.

---

## Step 2: Add the Delivery Date Column

- In the Work Package list view, click the **"Columns"** button (top-right).
- Select **Manage Columns**.
- **Add "Delivery Date"** to your table view.
- Click **Apply**.

> 🔥 Now you will **see the Delivery Date** column alongside SalesOrderNumber, Price, Qty, etc.

---

## Step 3: Sort by Delivery Date

- Click on the small arrow near the **Delivery Date column name**.
- Select **Sort Ascending** (earliest to latest delivery)  
  or **Sort Descending** (latest to earliest delivery).

✅ Now your **Sales Orders** are **ordered by Delivery Date**!

---

# 📊 Bonus Options:

### 1. **Group by Delivery Date (Month)**

- Click **Group by** (next to Filters).
- Choose **Delivery Date** (you can group by exact date or by month).
- It will create sections like:
  - April 2025
  - May 2025
  - June 2025
- And under each, show all sales orders for that month!

---

### 2. **Filter by Delivery Date Range**

If you want to only show delivery dates within a specific time:

- Click **Filters** ➔ Add a filter: **Delivery Date**.
- Choose something like:
  - `between 2025-05-01 and 2025-05-31` (for May deliveries)
- Only sales orders for May will show!

---


