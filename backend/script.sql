create database Blog_page;
use Blog_page;

create table users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  Bio TEXT
  location varchar(255)
);

CREATE TABLE blog (
  user_id INT,
  blog_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  readTime VARCHAR(50),
  category VARCHAR(50),
  imageUrl VARCHAR(255),
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

INSERT INTO blog (user_id, title, description, date, readTime, category, imageUrl) VALUES
(null, 'The Rise of Sustainable Fashion', 'Exploring eco-friendly brands and practices.', '2025-11-01', '3 min', 'Fashion', 'https://images.unsplash.com/fashion0.jpg'),
(null, 'Starting Your Own Business', 'A comprehensive guide to small business ownership.', '2025-11-02', '4 min', 'Business', 'https://images.unsplash.com/business1.jpg'),
(null, 'Top Travel Destinations 2025', 'Must-visit places around the world this year.', '2025-11-03', '5 min', 'Travel', 'https://images.unsplash.com/travel2.jpg'),
(null, 'Fashion Week Highlights', 'Memorable moments from the latest runways.', '2025-11-04', '6 min', 'Fashion', 'https://images.unsplash.com/fashion3.jpg'),
(null, 'Business Strategies That Work', 'Effective strategies shaping modern enterprises.', '2025-11-05', '7 min', 'Business', 'https://images.unsplash.com/business4.jpg'),
(null, 'Travel on a Budget', 'Tips to see the world without breaking the bank.', '2025-11-06', '3 min', 'Travel', 'https://images.unsplash.com/travel5.jpg'),
(null, 'Vintage Fashion Comeback', 'How retro styles are influencing today’s trends.', '2025-11-07', '4 min', 'Fashion', 'https://images.unsplash.com/fashion6.jpg'),
(null, 'Entrepreneurship Challenges', 'Overcoming common hurdles as a startup founder.', '2025-11-08', '5 min', 'Business', 'https://images.unsplash.com/business7.jpg'),
(null, 'Cultural Travel Experiences', 'Immersive cultural tours that enrich the soul.', '2025-11-09', '6 min', 'Travel', 'https://images.unsplash.com/travel8.jpg'),
(null, 'Fashion Tips for Every Season', 'Practical advice for dressing well year-round.', '2025-11-10', '7 min', 'Fashion', 'https://images.unsplash.com/fashion9.jpg'),
(null, 'Business Networking Secrets', 'Building valuable connections in your industry.', '2025-11-11', '3 min', 'Business', 'https://images.unsplash.com/business10.jpg');


select * from users;
select * from blog;	
select * from favouritelist;	

drop table blog;
drop table tasks; 
drop table favouritelist;


drop database Blog_page;