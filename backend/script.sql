create database Blog_page;
use Blog_page;

create table users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  Bio TEXT,
  location varchar(255)
);

CREATE TABLE blogs(
  user_id INT,
  blog_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  readTime VARCHAR(50),
  category VARCHAR(50),
  imageUrl TEXT,
  author varchar(50),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE comments(
  user_id INT NOT NULL,
  blog_id INT NOT NULL,
  PRIMARY KEY(user_id, blog_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (blog_id) REFERENCES blog(blog_id) ON DELETE CASCADE
);

CREATE TABLE favouritelist (
  user_id INT NOT NULL,
  blog_id INT NOT NULL,
  PRIMARY KEY(user_id, blog_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (blog_id) REFERENCES blog(blog_id) ON DELETE CASCADE
);

INSERT INTO blogs (user_id, title, description, date, readTime, category, author, imageUrl) VALUES
(NULL, 'The Rise of Sustainable Fashion', 'Exploring eco-friendly brands and practices.', '2025-11-01', '3 min', 'Fashion', 'Alice Johnson', 'https://mumayizat.com/wp-content/uploads/elementor/thumbs/fashion2-qryo4xcr9oz480h6q0w9c4z2mv0xse0xrhs8wtqtnk.webp'),
(NULL, 'Starting Your Own Business', 'A comprehensive guide to small business ownership.', '2025-11-02', '4 min', 'Business', 'Bob Smith', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=max'),
(NULL, 'Top Travel Destinations 2025', 'Must-visit places around the world this year.', '2025-11-03', '5 min', 'Travel', 'Carol White', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=max'),
(NULL, 'Fashion Week Highlights', 'Memorable moments from the latest runways.', '2025-11-04', '6 min', 'Fashion', 'David Lee', 'https://images.unsplash.com/photo-1542068829-1115f7259450?w=400&auto=format&fit=max'),
(NULL, 'Business Strategies That Work', 'Effective strategies shaping modern enterprises.', '2025-11-05', '7 min', 'Business', 'Eva Brown', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=max'),
(NULL, 'Travel on a Budget', 'Tips to see the world without breaking the bank.', '2025-11-06', '3 min', 'Travel', 'Frank Green', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=max'),
(NULL, 'Vintage Fashion Comeback', 'How retro styles are influencing today’s trends.', '2025-11-07', '4 min', 'Fashion', 'Grace Hall', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=max'),
(NULL, 'Entrepreneurship Challenges', 'Overcoming common hurdles as a startup founder.', '2025-11-08', '5 min', 'Business', 'Henry Adams', 'https://blog.ipleaders.in/wp-content/uploads/2019/10/getty_511932822_126002.jpg'),
(NULL, 'Cultural Travel Experiences', 'Immersive cultural tours that enrich the soul.', '2025-11-09', '6 min', 'Travel', 'Isabella Knight', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&auto=format&fit=max'),
(NULL, 'Fashion Tips for Every Season', 'Practical advice for dressing well year-round.', '2025-11-10', '7 min', 'Fashion', 'Jack Martin', 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&auto=format&fit=max'),
(NULL, 'Business Networking Secrets', 'Building valuable connections in your industry.', '2025-11-11', '3 min', 'Business', 'Kara Simmons', 'https://st.depositphotos.com/39965154/57394/i/450/depositphotos_573946448-stock-photo-beautiful-asian-young-woman-looking.jpg'),
(NULL, 'Discovering Street Food in Asia', 'A flavorful journey through Asia’s best street food markets.', '2025-11-12', '3 min', 'Food', 'Liam Turner', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=max'),
(NULL, 'Traditional Italian Cuisine', 'Exploring authentic recipes and flavors from Italy.', '2025-11-13', '4 min', 'Food', 'Mia Gomez', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNIHOKmXKbeqQhgfJZxuLh6M9oiK_qujH9tQ&s'),
(NULL, 'Vegan Delights from South America', 'Healthy and delicious vegan dishes from South American countries.', '2025-11-14', '5 min', 'Food', 'Noah Baker', 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/23/4f/25/a-sunshine-drops.jpg'),
(NULL, 'French Pastry Art', 'The history and technique behind classic French pastries.', '2025-11-15', '6 min', 'Food', 'Olivia Price', 'https://polkadotpassport.com/wp-content/uploads/2022/06/Best-desserts-Paris-4703.jpg'),
(NULL, 'Food Festivals You Must Visit', 'Top global food festivals that celebrate culinary culture.', '2025-11-16', '7 min', 'Food', 'Peter Chen', 'https://static.euronews.com/articles/stories/07/61/61/58/1440x810_cmsv2_bc594186-8ff2-5815-b4b4-c9b46d45142b-7616158.jpg'),
(NULL, 'Sustainable Fabrics to Watch', 'A deep dive into eco-friendly fabric innovations transforming fashion.', '2025-11-17', '5 min', 'Fashion', 'Quinn Foster', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6lhSJYi6UZmvMRp0uqWCNLRDGf4oVhC4Qg&s'),
(NULL, 'The Influence of Streetwear', 'How streetwear culture is shaping modern fashion trends.', '2025-11-18', '4 min', 'Fashion', 'Rachel Adams', 'https://i.pinimg.com/736x/2b/9a/17/2b9a1744c637b5ef48e9eb24889f6bf3.jpg'),
(NULL, 'Adventure Travel', 'Thrilling outdoor and adventure travel ideas.', '2025-11-10', '4 min', 'Travel', 'Samuel Bennett', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=max'),
(NULL, 'Family Travel Tips', 'Helpful advice for travelling with children.', '2025-11-11', '4 min', 'Travel', 'Tina Wells', 'https://rltours.in/wp-content/uploads/2024/07/Untitled-design-13.jpg'),
(NULL, 'Eco-friendly Travel', 'Sustainable and environmentally conscious travel practices.', '2025-11-12', '5 min', 'Travel', 'Umar Malik', 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&auto=format&fit=max'),
(NULL, 'Luxury Travel Trends', 'Latest trends and experiences in luxury travel.', '2025-11-13', '6 min', 'Travel', 'Victoria Grant', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=max'),
(NULL, 'Solo Travel Benefits', 'Why travelling alone can be rewarding.', '2025-11-14', '3 min', 'Travel', 'William Hunt', 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&auto=format&fit=max'),
(NULL, 'Travel Photography Tips', 'How to capture stunning travel photos.', '2025-11-15', '4 min', 'Travel', 'Xena Parker', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=max'),
(NULL, 'Biryani: A Flavorful Journey', 'Discover the history and varieties of biryani.', '2025-11-16', '4 min', 'Food', 'Yusuf Khan', 'https://www.sidechef.com/recipe/6df5d24c-24a1-417a-b317-f83d949447fc.jpg?d=1408x1120'),
(NULL, 'Noodles Around the World', 'Explore different types of noodles and their origins.', '2025-11-17', '5 min', 'Food', 'Zara Ali', 'https://www.ramenheaven.de/cdn/shop/articles/japanische-tantanmen-ramen-735320.png?crop=center&height=1200&v=1743338472&width=1200'),
(NULL, 'Sushi: Art on a Plate', 'Learn about sushi making and its cultural significance.', '2025-11-18', '6 min', 'Food', 'Aaron White', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&auto=format&fit=max'),
(NULL, 'Delicious Fish Dishes', 'Top recipes and cooking tips for fish lovers.', '2025-11-19', '4 min', 'Food', 'Bella Young', 'https://ik.imagekit.io/munchery/blog/tr:w-768/5-exquisite-mediterranean-recipes-for-barbecuing-whole-fish.jpeg');

select * from users;
select * from blogs;	
select * from favouritelist;	

drop table blogs;
drop table favouritelist;


drop database Blog_page;