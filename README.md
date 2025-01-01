# Amazon Clone Project

A front-end clone of Amazon's e-commerce website, built as part of the [SuperSimpleDev](https://www.youtube.com/c/SuperSimpleDev) YouTube JavaScript course. This project mimics key features of Amazon's user interface and functionality while incorporating unique features and personalized approaches.

## Key Features
- **Dynamic Product Grid**: Products are dynamically rendered using JavaScript from a predefined data source.
- **Add to Cart**: Users can add items to the cart with quantity selection, and the cart updates in real-time.
- **Order Tracking**: Displays mock order tracking information for purchased products.
- **Search Bar with Unique Logic**: 
  - Implements a custom search functionality to filter products based on user input.
  - This approach differs from the tutorial, showcasing personalized problem-solving.
- **Delete Button for Order Tracking**:
  - Added a delete button to remove orders directly from the tracking page.
  - Includes JavaScript functionality to update the DOM and persist changes.

## Purpose
This project was created to:
- Strengthen JavaScript skills by implementing interactive front-end features.
- Learn and apply DOM manipulation and event handling.
- Explore modular coding practices for scalability and maintainability.
- Understand the basics of testing front-end functionality using Jasmine.

## Technologies Used
- **HTML5**: Semantic structure for building pages.
- **CSS3**: Styling and responsive design.
- **JavaScript (ES6)**: Logic for dynamic content, interactivity, and event handling.
- **Jasmine**: Testing framework used for front-end testing.
- **Git and GitHub**: Version control and project hosting.

## Unique Contributions
1. **Search Bar Logic**:
   - My approach to the search bar is different from the original tutorial:
     - Uses custom logic for filtering products.
     - Dynamically hides or shows products in real-time as the user types.
2. **Delete Button for Order Tracking**:
   - Added functionality to delete orders directly from the tracking page.
   - Includes DOM manipulation to remove orders and updates the data state persistently.
3. **Testing with Jasmine**:
   - Wrote unit tests using the Jasmine framework to validate key JavaScript functions, such as:
     - Adding items to the cart.
     - Updating the cart quantity.
     - Deleting orders.

## What I Learned
- How to dynamically generate content with JavaScript.
- Handling user interactions like search and delete operations.
- Managing application state (e.g., cart, orders) with JavaScript.
- Debugging and testing features for usability and performance.
- Writing and running unit tests using Jasmine to ensure code reliability.

## Getting Started
To view the project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/estebonbon/mock-amazon.git

