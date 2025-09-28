# VaahanBazar – Two-Wheeler Marketplace Web App

## a) Problem Statement Reference  

Problem Statement Chosen:  
Build a two-wheeler marketplace web app where users can browse bikes, scooters, and EVs; search and filter by brand, price, or fuel type; view detailed specs with images; compare models side by side; use EMI and fuel cost calculators; check upcoming launches; explore showrooms; and book test rides or sell used bikes.  

Reason to Choose the Problem Statement:  
We chose this problem because the two-wheeler market in India and globally is vast, but buyers face challenges in comparing models, calculating ownership costs, and booking test rides online. A single integrated platform makes the process transparent, fast, and user-friendly.

## b) Solution Overview  

Proposed Approach (2–3 lines):  
Develop a responsive, full-stack web application where users can search, compare, and book two-wheelers with modern tools like EMI calculators and real-time inventory updates. Dealerships can manage listings and sales, while customers enjoy seamless buying and selling.  

Key Features / Modules:  
- User authentication & profile management  
- Vehicle browsing and advanced search/filter  
- Side-by-side comparison of models  
- EMI & fuel cost calculators  
- Upcoming launch alerts  
- Dealer showroom exploration  
- Test drive booking system  
- Used bike listing & selling  
- Admin dashboard for dealerships  


## c) System Architecture  

Architecture Diagram / Workflow:  
![Architecture Diagram](architecture-diagram.png)  

Data Flow Explanation:  
1. User interacts with the Frontend (React.js) → requests are sent to the Backend (Node.js/Express or Django/Flask).  
2. Backend processes requests, interacts with the Database (PostgreSQL/MongoDB), and applies business logic.  
3. Data is returned to the frontend as JSON and rendered for the user.  
4. Optional ML modules (recommendations, pricing predictions) interact with the backend for advanced features.  

## d) Technology Stack  

- Frontend: React.js (with Tailwind/Bootstrap for UI)  
- Backend: Node.js with Express.js (or Flask/Django if Python is chosen)  
- Database: PostgreSQL / MongoDB  
- ML/AI Frameworks (Optional): Scikit-learn, TensorFlow (for recommendation/pricing)  
- APIs / Libraries:  
  - Axios / Fetch for API calls  
  - JWT for authentication  
  - Chart.js/Recharts for visualizations  
  - Third-party APIs (if used for vehicle data)  

## e) Algorithms & Models  

Algorithm(s) Chosen:  
- Search & filter algorithms for fast queries  
- Recommendation algorithm for suggesting bikes (content-based filtering)  
- EMI and fuel cost calculation formulas  

Reason for Choice:  
- Improves user experience with smart suggestions and easy financial planning.  
- Ensures accurate and scalable comparison.  

Model Training & Testing Approach:  
- Collect vehicle dataset (price, mileage, fuel, EMI details).  
- Preprocess (cleaning, normalization).  
- Train recommendation model → validate with test data → deploy as microservice.  


## f) Data Handling  

Data Sources Used (APIs/Datasets):  
- Public vehicle datasets (Kaggle, Gov APIs, or dealership data).  
- User-provided input data (for bookings and profiles).  

Preprocessing Methods:  
- Remove duplicates, normalize price and mileage values.  
- Convert categorical data (fuel type, brand) into machine-readable formats.  

Storage / Pipeline Setup:  
- Database schema with tables/collections: Users, Vehicles, Dealers, Bookings, Comparisons.  
- ETL pipeline for importing vehicle datasets.  


## g) Implementation Plan  

1. Initial Setup & Environment – GitHub repo setup, frontend & backend boilerplate code.  
2. Core Module Development – Build user authentication, vehicle listing, comparison, EMI calculator.  
3. Integration & Testing – Connect backend APIs with frontend, validate workflows.  
4. Final Deployment-ready Build – Optimize performance, UI polish, deploy on cloud.  


## h) Performance & Validation  

Evaluation Metrics:  
- Page load time and API response time  
- Accuracy of EMI/fuel cost calculators  
- Usability tests with sample users  

Testing Strategy:  
- Unit testing for backend APIs  
- Integration testing for frontend-backend flow  
- End-to-end manual testing for booking flows  


## i) Deployment & Scalability  

Deployment Plan:  
- Frontend on Vercel/Netlify  
- Backend on Render/Heroku/AWS  
- Database on AWS RDS or MongoDB Atlas  

Scalability Considerations:  
- Caching frequently accessed data (Redis)  
- Database indexing & query optimization  
- Containerization with Docker for scaling microservices  
- Load balancing & auto-scaling in cloud environment  
