---
sidebar_position: 3
---

# User Management

The User Management group includes multiple options to manage all types of users connected with the platform — including main users who access the app and website for course learning, instructors (when multi-instructor mode is enabled) who upload content to the platform, and staff members who are admin staff with configurable permissions.

---

## Users

### User List

Displays the list of all users with their details. Each entry includes an option to view additional information and an option to activate or deactivate the user's account. Deactivated users are automatically logged out of the application and website and are not permitted to log in until their account is reactivated.

### Wallet History

Displays wallet transaction statistics along with a full table of all credit and debit transaction records related to the user's wallet.

### Withdrawal Requests

Displays withdrawal request statistics along with all withdrawal requests in a table. Each entry includes an option to view details and update the status if the request is currently pending. Requests can be updated with a note and a new status of either accepted or rejected. Rejecting a request returns the requested amount to the user's wallet, which they can then spend on the platform. Accepting a request marks it as paid without making any adjustments to the wallet balance, since the amount is removed when the request is initially created. Payment of withdrawal requests is handled manually by the admin in the instructor's bank account, and the bank details can be viewed from within each request's details page.

---

## Instructors

### Instructor Form Fields

Allows CRUD management of custom form fields for instructors. These fields can be customised as needed and appear during instructor registration on the website, as well as on the edit profile and details pages. Each field has a name, type, required toggle, and a type-based value configuration option. Supported types include: Text, Numeric, File Upload, Radio Button, Checkbox, and Dropdown. Fields can be reordered via drag-and-drop directly from the table to adjust the sequence in which they appear in the form.

### Instructor List

Lists all instructors and their requests with minimal details in the table, along with a status-based filtering option. Two actions are available for each entry:

1. **View Details** – Opens a details page showing all submitted information, uploaded files, and custom field responses from the instructor's registration.
2. **Status Change** – Allows the admin to approve, reject, or suspend an instructor's account. Approval grants access to the instructor panel; rejection allows the instructor to resubmit with changes; suspension prevents any further requests. A reason can be provided for each status change. The status update also sends an email and push notification to the instructor.

### Wallet History

Displays the wallet transactions of an instructor, including credits and debits from purchases and commission settlements on the courses they sell. These transactions can be viewed, filtered, and downloaded using the general table filtering and export features.

### Withdrawal Requests

Lists withdrawal requests submitted by instructors along with their statistics. Each entry includes an option to view the request details — including the requested amount, the instructor's bank details, and their note. The admin can manually process the payment and mark the status as approved, or reject the request with a reason.

---

## Staff

### Manage Custom Roles

Provides CRUD operations to manage custom roles. Each role has a name and configurable feature-wise permissions, including: List, Create, Edit, Delete, Approve, Reject, Request, Restore, Trash, Reorder, and more. These roles can be assigned to staff members to grant them access to the selected features within their role.

### Manage Staff

Staff members with admin panel access can be managed from this section. In addition to the super admin, staff members can use the same admin panel with the permissions their role grants them. Staff accounts can be created with a name, email, account status toggle, role, and password. Existing staff accounts can be deactivated, reactivated, edited, and have their passwords changed, or can be permanently deleted from this section.
